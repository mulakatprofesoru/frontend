import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "../pages/HomePage";
import InterviewPage from "../pages/InterviewPage";
import DenemePage from "../pages/DenemePage";
import HistoryPage from "../pages/HistoryPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="interview" element={<InterviewPage />} />
        <Route path="deneme" element={<DenemePage />} />
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

