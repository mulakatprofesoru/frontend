import React from "react";
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    const InterviewPage = () => {
        navigate('/interview');
    }
    const DenemePage = () => {
        navigate('/Deneme');
    }
    return(
        <section>
            <button onClick={InterviewPage}>Genel</button>
            <button onClick={InterviewPage} >Bilgisayar mühendisliği</button>
            <button onClick={DenemePage}>Deneme</button>
        </section>
    );
}

export default Home;