import React from 'react';
import ToDoItem from './ToDoItem';

export const ToDosContainer = props => {

  // get the items from props
  const items = props.items;
  // change item status calling the API
  const updateItem = item => props.updateFromChild(item);
  // delete the item calling the API
  const deleteItem = item => props.deleteFromChild(item);
  // map the items and create item component
  // pass the data as props, as well as the requests
  const todoItems = items.map(item =>
    <ToDoItem
      key={item._id}
      item={item}
      handleUpdate={updateItem}
      handleDelete={deleteItem}
      type={"todos-string"}
    />);

  return (
    <div className="todos-container">
      {items.length > 0 && (
        <div className="todos">
          <h5 className = "todos-title">{props.name}</h5>
          {todoItems}
        </div>
      )}
    </div>
  );
}
