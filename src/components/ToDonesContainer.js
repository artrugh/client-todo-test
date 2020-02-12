import React from 'react';
import ToDoItem from './ToDoItem';

export const ToDonesContainer = props => {

  // get the items from props and pass it as props in the item
  const items = props.items;
  // change the status of the item calling the API
  const updateItem = id => props.updateFromChild(id);
  // delete the item calling the API
  const deleteItem = id => props.deleteFromChild(id);
  // map the items and create item component
  // pass the data as props, as well as the requests
  const todoneItems = items.map(item =>
    <ToDoItem
      key={item._id}
      item={item}
      handleUpdate={updateItem}
      handleDelete={deleteItem}
      type = {"todones-string"} />);

  return (
    <div className="todos-container">
      {items.length > 0 &&
        (<div className="todones">
          <h5 className = "todones-title">{props.name}</h5>
          {todoneItems}
        </div>
        )}
    </div>
  );
}
