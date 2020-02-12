import React, { useState, useEffect } from 'react';

// components
import Navigation from '../components/Navigation';
import FormContainer from '../components/FormContainer';
import { ToDosContainer } from '../components/ToDosContainer';
import { ToDonesContainer } from '../components/ToDonesContainer';
import { Spinner } from '../components/Spinner';

// requests
import {
    getUser,
    addItem,
    deleteItem,
    changeTodoStatus
} from '../requests/fetchData';

const User = props => {

    // get the token
    const jwt = localStorage.getItem('x-auth-token');

    // if there is not token redirect to the login
    if (!jwt) props.history.push('/login');

    // hook where the data from the user is stored
    const [data, setData] = useState()
    // AllItems
    const [items, setItems] = useState([]);

    // todos
    const [todos, setTodos] = useState([]);
    // todones
    const [todones, setTodones] = useState([]);
    // alarm message
    const [alarm, setAlarm] = useState('');
    // load controll
    const [loadContr, setLoadContr] = useState({
        isLoading: false,
        isError: false,
        showFriend: false
    });

    // REQUESTS

    const addNewItem = async item => {
        let newItem = await addItem(jwt, item);
        if (newItem.status !== 200) { setAlarm(newItem.data) }
        else {
            newItem = newItem.data
            await setItems([...items, newItem]);
            console.log(items);
        }
    }

    const deleteOneItem = async item => {

        const deletedItem = await deleteItem(jwt, item);
        if (deletedItem.status !== 200) setAlarm(deletedItem.data)
        const newItems = items.filter(item => item._id !== deletedItem.data._id);
        await setItems(newItems);
    }

    const changeTodoStatusItem = async item => {

        const updatedItem = await changeTodoStatus(jwt, item);
        if (updatedItem.status !== 200) setAlarm(updatedItem.data)
        const newItems = items.filter(item => item._id !== updatedItem.data._id);
        await setItems([updatedItem.data, ...newItems]);
        console.log(items);

    };

    const fetchData = async () => {
        //fetch data
        const res = await getUser(jwt);
        // store the data in the function
        setData(res);
        console.log("data stored");
    }

    const checkData = async () => {

        await setLoadContr({ ...loadContr, isLoading: false, isError: false });

        // unsucced fetch
        if (data.status !== 200) {
            await setLoadContr({ ...loadContr, isError: true, isLoading: false });
            await setAlarm('Oops, problems with the internet. Please try again...')
            // otherwise store the items
        } else {
            // if it is the admin redirect to the adimon dashboard
            if (data.data.role === "admin") props.history.push('/admin');
            // if there is no item
            if (data.data.todos.length === 0) {
                await setLoadContr({ ...loadContr, showFriend: true, isLoading: false });
                await setAlarm("Use the form to create a new todo!")

            };
            await setAlarm("")
            await setItems(data.data.todos);
        }
    }

    useEffect(() => {

        // this happens after the first render = componentDidUnmont
        if (!data) {
            console.log("fetching API ...");
            // name the document with name of the user
            document.title = `TodoApp`;
            // now is loading
            setLoadContr({ ...loadContr, isLoading: true });
            // call the function
            fetchData();
        }
        else if (items.length === 0) {
            // call the function in the second render
            // after the data has already stored in the hook
            checkData()
        } else {
            // only run it if items changed
            splitItems(items);
        }

    }, [data, items]);

    const splitItems = async items => { 
        // separete items
        if (items.length === 0) { setAlarm("Use the form to create a new todo!") }
        console.log("separating items");
        // get the items which are not done
        if (items.length > 1) {
            
            setTodos(items.filter(item => !item.status));
            // get the items which are done
            setTodones(items.filter(item => item.status));
        }
    };

    return (
        <>
            <Navigation name={data ? data.data.name : ""} jwt={jwt} />
            <main className="main-container">
                <FormContainer addNewItem={addNewItem} />

                <div className="feedback">
                    {loadContr.isError && (
                        <>
                            <small>{alarm}</small>
                            <button className="btn refresh"
                                onClick={() => fetchData()}
                            >click here</button>
                        </>
                    )}
                </div>

                {loadContr.isLoading && <Spinner />}

                {!loadContr.showFriend &&
                    <>
                        <ToDosContainer
                            name="TODOS"
                            items={todos}
                            updateFromChild={changeTodoStatusItem}
                            deleteFromChild={deleteOneItem}
                        />
                        <ToDonesContainer
                            name="TODONES"
                            items={todones}
                            updateFromChild={changeTodoStatusItem}
                            deleteFromChild={deleteOneItem}
                        />
                    </>
                }
            </main>
        </>
    )
}
export default User;