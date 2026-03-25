import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/pages/Login";
import Signup from "./component/pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;