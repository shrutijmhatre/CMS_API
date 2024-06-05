import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import EditPage from "./pages/EditPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
