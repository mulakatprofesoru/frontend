import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "../pages/HomePage";
import InterviewPage from "../pages/InterviewPage";
import DenemePage from "../pages/DenemePage";
import HistoryPage from "../pages/HistoryPage";
import DenemeQuestionPage from "../pages/DenemeQuestionPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="interview/:interviewType" element={<InterviewPage />} />
        <Route path="deneme" element={<DenemePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="deneme_question/:denemeNumber" element={<DenemeQuestionPage/>}/>
      </Routes>
    </Router>
  );
}

