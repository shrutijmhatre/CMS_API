import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
