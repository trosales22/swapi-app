import Wrapper from "./components/Wrapper";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
      
      <ToastContainer />
    </Wrapper>
  );
}

export default App;
