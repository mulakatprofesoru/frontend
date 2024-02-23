import React from "react";
import { useNavigate } from 'react-router-dom';

function DenemePage(){
  const navigate = useNavigate();
    const InterviewPage = () => {
        navigate('/interview');
    }
  return (
      <div className="deneme_contanier">
        <div className="deneme">
          <button onClick={InterviewPage} className="button">Deneme 1</button>
          <button onClick={InterviewPage} className="button">Deneme 2</button> 
          <button onClick={InterviewPage} className="button">Deneme 3</button>
          <button onClick={InterviewPage} className="button">Deneme 4</button>
          <button onClick={InterviewPage} className="button">Deneme 5</button>
          <button onClick={InterviewPage} className="button">Deneme 6</button>
          <button onClick={InterviewPage} className="button">Deneme 7</button>
          <button onClick={InterviewPage} className="button">Deneme 8</button>
          <button onClick={InterviewPage} className="button">Deneme 9</button>
          <button onClick={InterviewPage} className="button">Deneme 10</button>
        </div>
      </div>  )
};

export default DenemePage;