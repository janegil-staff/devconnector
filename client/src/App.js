import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./coomponents/layout/Landing";
import Navbar from "./coomponents/layout/Navbar";
import Register from "./coomponents/auth/Register";
import Login from "./coomponents/auth/Login";

const App = () => {
  return (
    <Router>
      <Navbar />
   
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
  

    </Router>
  );
};

export default App;
