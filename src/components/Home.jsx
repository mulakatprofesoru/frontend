import React from "react";
import { useNavigate } from 'react-router-dom';
import LoginButton from "./LoginButton";

function Home(){
    const navigate = useNavigate();
    const InterviewPage = () => {
        navigate('/interview');
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
                <button className="button" onClick={InterviewPage}>Genel</button>
                <button className="button" onClick={InterviewPage} >Bilgisayar mühendisliği</button>
                <button className="button" onClick={DenemePage}>Deneme</button>
            </section>
        </div>
    );
}

export default Home;