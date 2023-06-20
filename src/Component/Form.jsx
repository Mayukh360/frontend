import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Form() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [userData, setUserdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/getData");
      // console.log(response.data);
      setUserdata(response.data);
    };
    fetchData();
  }, []);

  const onChangeHandler = (event) => {
    setData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Perform any actions with the form data here, such as making an API request

    await axios.post("http://localhost:3000/getData", data);
    event.target.reset();
    const response = await axios.get("http://localhost:3000/getData");
    // console.log(response.data);
    setUserdata(response.data);
  };
  const dltBtnhandler = (item) => {
    // console.log(item.id);
    const filteredData=userData.filter(product=>product.id!==item.id)
    setUserdata(filteredData);
    axios.delete(`http://localhost:3000/getData/${item.id}`)
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
      {userData &&
        userData.map((item) => (
          <li key={item.id}>
            <h3>
               Name :{item.name}--Email :{item.email}---Phone :
              {item.phone}
              <button onClick={() => dltBtnhandler(item)}>Delete</button>
            </h3>
          </li>
        ))}
    </div>
  );
}
