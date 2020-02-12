import React, { useState, useEffect } from 'react';

// components
import Navigation from '../components/Navigation';
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

    // renders
    const [render, setRender] = useState(1)
    // hook where the data from the user is stored
    const [data, setData] = useState()
    // AllItems
    const [items, setItems] = useState([]);
    // todos
    const [todos, setTodos] = useState([]);
    // todones
    const [todones, setTodones] = useState([]);
    // alarm message
    const [alarm, setAlarm] = useState(undefined);
    // load controll
    const [loadContr, setLoadContr] = useState({
        isLoading: false,
        displayUI: false
    });

    // REQUESTS

    const addNewItem = async item => {
        let newItem = await addItem(jwt, item);
        if (newItem.status !== 200) { setAlarm(newItem.data) }
        else {
            newItem = newItem.data
            await setItems([...items, newItem]);
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

    };

    const fetchData = async () => {

        await setLoadContr({ ...loadContr, isLoading: true });
        //fetch data
        const res = await getUser(jwt);
        // store the data in the function
        setData(res);
        console.log("Data stored");
    }

    const checkData = () => {

        console.log("Checking data...");

        // unsucced fetch
        if (data.status !== 200) {

            setAlarm('Oops, problems with the internet. Please refresh the page...')
            console.log("RETURNING ERRORS");

            // otherwise store the items
        } else {
            // if it is the admin redirect to the adimon dashboard
            if (data.data.role === "admin") props.history.push('/admin');
            // if there is no item
            if (data.data.todos.length === 0) {
                // await setLoadContr({ ...loadContr, showFriend: true, isLoading: false });
                setAlarm("Use the form to create a new todo!");
                console.log("No items");
            };
            console.log("Items to show");
            setAlarm("");
            setItems(data.data.todos);
        }
    }

    const splitItems = async items => {

        setLoadContr({ ...loadContr, displayUI: true });
        
        // get the items which are not done
        if (items.length > 0) {
            setAlarm("");
            setTodos(items.filter(item => !item.status));
            // get the items which are done
            setTodones(items.filter(item => item.status));
        } else {
            setAlarm("Use the form to create a new todo!");
            setTodos([]);
            setTodones([]);
        }
    };

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
            console.log("Data Stored");

        }
        else if (data && loadContr.isLoading) {
            console.log(data.data.todos);
            setLoadContr({ ...loadContr, isLoading: false });
            // call the function in the thrid render
            // after the data has already stored in the hook
            checkData();

        } else if (!loadContr.isLoading && !loadContr.displayUI) {
            splitItems(items);
            // setLoadContr({ ...loadContr, displayUI: true });
            console.log("separating items first time");

        } else if (loadContr.displayUI) {
            console.log("Separating Items");
            console.log(todos);
            splitItems(items);
        }

        setRender(render + 1);
        console.log(render);

    }, [data, items, loadContr.displayUI]);

    return (
        <>
            <Navigation
                name={data ? data.data.name : ""}
                jwt={jwt}
                addNewItem={addNewItem} />

            <main className="main-container">
                <small>{alarm}</small>
                {loadContr.isLoading && <Spinner />}
                {loadContr.displayUI &&
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