import React from "react";
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    const QuestionPage = () => {
        navigate('/Question');
    }
    return(
        <section>
            <button onClick={QuestionPage}>Genel</button>
            <button onClick={QuestionPage} >Bilgisayar mühendisliği</button>
            <button>Deneme</button>
        </section>
    );
}

export default Home;