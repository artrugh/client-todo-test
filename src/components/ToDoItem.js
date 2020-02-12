import React from 'react';

const ToDoItem = props => {

  // update the state of the item
  const updateItem = e => {
    e.preventDefault();
    const item = props.item._id;
    props.handleUpdate(item);
  }
  // or delete an item
  const deleteItem = e => {
    e.preventDefault();
    const item = props.item._id;
    props.handleDelete(item);
  }

  return (
    <div className="item">
      <p className = {props.type}>{props.item.item}</p>
      <div className="button-container">
        <button className="btn item-button" onClick={updateItem}>
          {props.item.status ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>}
        </button>
        <button className="delete-icon" onClick={deleteItem}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
