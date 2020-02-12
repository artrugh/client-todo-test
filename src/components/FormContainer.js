import React, { useState, useEffect, createRef } from 'react';

const FormContainer = props => {
  // store the written item
  const [item, setItem] = useState({ item: "" });
  // create a reference accesing the DOM
  const inputText = createRef()


  // store the written item in the hook
  const change = e => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  // call the API post a new item
  const submit = async e => {
    e.preventDefault()
    props.addNewItem(item.item)
  }

  useEffect(() => {
    inputText.current.value = "type your next todo";
  }, [submit])


  return (
    <div className="form-container">
      <form className="item-form" onSubmit={submit}>
        <input
          ref={inputText}
          type="text"
          name="item"
          placeholder="type your next todo"
          onClick={e => e.target.value = ""}
          onChange={change}
          value={item.item} />
        <button className="btn" type="submit">ADD</button>
      </form>
    </div>
  )
}

export default FormContainer;
