
import Form from "./Component/Form";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Component/LoginPage";

function App() {

  return (
    <div>
      <Routes>
      <Route path="/" element={<Form/>} />
      <Route path="/login" element={<LoginPage/>} />
      </Routes>
     
    </div>
  );
}

export default App;
