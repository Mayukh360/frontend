import axios from "axios";
import react, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Component/Form";

function App() {
  // const [data, setData] = useState("");
  // const fetchData = async () => {
  //   const response = await axios.get("http://localhost:3000/getData");
  //   console.log(response.data);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div>
      <Form/>
    </div>
  );
}

export default App;
