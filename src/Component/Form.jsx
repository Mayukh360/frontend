import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Form() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [userData, setUserdata] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/getData");
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

    if (selectedItem) {
      const updatedData = {
        id: selectedItem.id,
        name: event.target.name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
      };

      await axios.put(
        `http://localhost:3000/getData/${selectedItem.id}`,
        updatedData
      );

      setSelectedItem(null);
      setData({
        name: "",
        email: "",
        phone: "",
      });

      const response = await axios.get("http://localhost:3000/getData");
      setUserdata(response.data);
    } else {
      await axios.post("http://localhost:3000/getData", {
        name: event.target.name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
      });

      event.target.reset();

      const response = await axios.get("http://localhost:3000/getData");
      setUserdata(response.data);
    }
  };

  const dltBtnhandler = async (item) => {
    const filteredData = userData.filter((product) => product.id !== item.id);
    setUserdata(filteredData);
    await axios.delete(`http://localhost:3000/getData/${item.id}`);
  };

  const editBtnHandler = (item) => {
    setSelectedItem(item);
    setData({
      name: item.name,
      email: item.email,
      phone: item.phone,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input onChange={onChangeHandler} type="text" name="name" value={data.name} />
        <label>Email</label>
        <input onChange={onChangeHandler} type="email" name="email" value={data.email} />
        <label>Phone</label>
        <input onChange={onChangeHandler} type="tel" name="phone" value={data.phone} />
        <button type="submit">{selectedItem ? "Update" : "Submit"}</button>
      </form>
      {userData &&
        userData.map((item) => (
          <li key={item.id}>
            <h3>
              Name: {item.name} -- Email: {item.email} -- Phone: {item.phone}
              <button onClick={() => dltBtnhandler(item)}>Delete</button>
              <button onClick={() => editBtnHandler(item)}>Edit</button>
            </h3>
          </li>
        ))}
    </div>
  );
}
