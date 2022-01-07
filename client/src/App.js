import { Route, Routes } from "react-router-dom";

import "./App.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/404page/NotFound";
import Browse from "./components/Browse/Browse";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
