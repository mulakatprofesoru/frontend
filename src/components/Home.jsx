import React from "react";
import { useNavigate } from 'react-router-dom';
import LoginButton from "./LoginButton";
import axios from "axios";

function Home(){
    const navigate = useNavigate();
    const InterviewPage = (interviewType) => {
        navigate(`/interview/${interviewType}`);
    }
    const DenemePage = () => {
        navigate('/deneme');
    }
    const HistoryPage = () => {
        navigate('/history');
          }
    return(
        <div >
            <LoginButton 
                history={HistoryPage}
                            />
            <section>
                <button className="button" onClick={() => InterviewPage('genel')}>Genel</button>
                <button className="button" onClick={() => InterviewPage('bilgisayar-muhendisligi')} >Bilgisayar mühendisliği</button>
                <button className="button" onClick={DenemePage}>Deneme</button>
            </section>
        </div>
    );
}

export default Home;