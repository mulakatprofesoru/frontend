import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import QuestionPage from "../pages/QuestionPage";
import DenemePage from "../pages/DenemePage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="question" element={<QuestionPage />} />
        <Route path="deneme" element={<DenemePage />} />
      </Routes>
    </Router>
  );
}

