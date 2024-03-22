import React from "react";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Home } from "@mui/icons-material";
function DenemePage(){
  const navigate = useNavigate();
    const DenemeQuestionPage = (denemeNumber) => {
        navigate(`/deneme_question/${denemeNumber}`);
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
            <button onClick={()=>{DenemeQuestionPage(1)}} className="button">Deneme 1</button>
            <button onClick={()=>{DenemeQuestionPage(2)}} className="button">Deneme 2</button> 
            <button onClick={()=>{DenemeQuestionPage(3)}} className="button">Deneme 3</button>
            <button onClick={()=>{DenemeQuestionPage(4)}} className="button">Deneme 4</button>
            <button onClick={()=>{DenemeQuestionPage(5)}} className="button">Deneme 5</button>
            <button onClick={()=>{DenemeQuestionPage(6)}} className="button">Deneme 6</button>
            <button onClick={()=>{DenemeQuestionPage(7)}} className="button">Deneme 7</button>
            <button onClick={()=>{DenemeQuestionPage(8)}} className="button">Deneme 8</button>
            <button onClick={()=>{DenemeQuestionPage(9)}} className="button">Deneme 9</button>
            <button onClick={()=>{DenemeQuestionPage(10)}} className="button">Deneme 10</button>
          </div>
        </div>  
      </div>
      )
};

export default DenemePage;