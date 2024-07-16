import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./layouts/Navbar";
import ProtectedRouter from "./utils/ProtectedRouter";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* <ProtectedRouter>
          <Route path="/" element={<Home />} />
        </ProtectedRouter> */}
      </Routes>
    </>
  );
}

export default App;
