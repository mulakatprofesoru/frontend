import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "../pages/HomePage";
import InterviewPage from "../pages/InterviewPage";
import DenemePage from "../pages/DenemePage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="interview" element={<InterviewPage />} />
        <Route path="deneme" element={<DenemePage />} />
      </Routes>
    </Router>
  );
}

