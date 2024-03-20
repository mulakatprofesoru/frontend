import React from "react";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Home } from "@mui/icons-material";
function DenemePage(){
  const navigate = useNavigate();
    const DenemeQuestionPage = () => {
        navigate('/deneme_question');
    }
    const HomePage = () => {
      navigate('/');
  }
  return (
      <div>
        <header>
          <h1><a href="/">Mülakat Profesörü</a></h1>
        </header>
        <div className="deneme_contanier">
        <ArrowBackIosIcon className="arrow-back" fontSize="large" onClick={HomePage}/>
          <div className="deneme">
            <button onClick={DenemeQuestionPage} className="button">Deneme 1</button>
            <button onClick={DenemeQuestionPage} className="button">Deneme 2</button> 
            <button onClick={DenemeQuestionPage} className="button">Deneme 3</button>
            <button onClick={DenemeQuestionPage} className="button">Deneme 4</button>
            <button onClick={DenemeQuestionPage} className="button">Deneme 5</button>
            <button onClick={DenemeQuestionPage} className="button">Deneme 6</button>
            <button onClick={DenemeQuestionPage} className="button">Deneme 7</button>
            <button onClick={DenemeQuestionPage} className="button">Deneme 8</button>
            <button onClick={DenemeQuestionPage} className="button">Deneme 9</button>
            <button onClick={DenemeQuestionPage} className="button">Deneme 10</button>
          </div>
        </div>  
      </div>
      )
};

export default DenemePage;