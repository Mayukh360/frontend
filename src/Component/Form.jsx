import React, { useState } from 'react';

export default function Form() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    setData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Perform any actions with the form data here, such as making an API request
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input onChange={onChangeHandler} type="text" name="name" />
        <label>Email</label>
        <input onChange={onChangeHandler} type="email" name="email" />
        <label>Phone</label>
        <input onChange={onChangeHandler} type="tel" name="phone" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
