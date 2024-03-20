import React, { useState , useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import HistoryHelperBox from "./HistoryHelperBox";
import { useAuth0 } from "@auth0/auth0-react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";

function History(){
  const [modal,setModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [history , setHistory] = useState([]); 
  const [HistoryPressed, setHistoryPressed] = useState(true);
  const [DenemePressed, setDenemePressed] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [currentHistory, setCurrentHistory]=useState({
    question : "",
    userAnswer : "",
    answer : "",
    score : ""});
  
  let index=0;
  
  const getCurrentId = (event) => {
    setCurrentHistory({
      question: history[event.target.id].question,
      userAnswer : history[event.target.id].user_answer,
      answer: history[event.target.id].correct_answer,
      score: history[event.target.id].user_id
    });
    openModal();  
  };

  const handleHistoryButtonClick = () => {
    setHistoryPressed(true);
    setDenemePressed(false); 
  };

  const handleDenemeButtonClick = () => {
    setDenemePressed(true);
    setHistoryPressed(false);
  };

  function openModal(){
    var box= document.getElementById("helper-box");
    if(modal){
      box.style.display = "none";
    }
    else{
      box.style.display = "block";
    }
    setModal(!modal);
  }

  const navigate = useNavigate();
  const HomePage = () => {
      navigate("/");
  }

  async function getHistory(){
    try {
      var response = await axios.get("http://localhost:5000/api/users/getTrainingHistory");
      if(response.status === 200){
          setHistory(response.data.data);
          setNotes(()=>{
            let data=[]
            for (let i = 0; i < response.data.data.length; i++) {
              data[i]="";
            }
            return data;
          });
      }
    } catch (error) {
      console.error('Error:', error); 
    }
  }

  useEffect(()=> {getHistory()} ,[]);
    
  return(
    <div>
      <header>
        <h1><a href="/">Mülakat Profesörü</a></h1>
        <div className="history-buttons">
          <button className={HistoryPressed ? 'button pressed' : 'button'}
            onClick={handleHistoryButtonClick} >Eğitim Geçmişi</button>
          <button className={DenemePressed ? 'button pressed' : 'button'}
            onClick={handleDenemeButtonClick}>Deneme Geçmişi</button>
            
        </div>
      </header>
      <ArrowBackIosIcon className="arrow-back" fontSize="large" onClick={HomePage}/>

        <HistoryHelperBox
          question={currentHistory.question}
          userAnswer={currentHistory.userAnswer}
          answer={currentHistory.answer}
          skor={currentHistory.score}
        />
        <div className="scrollable-window">
          {notes.map((note , index) => {
            return(
            <div key={index} className="history-container">
              <button onClick={getCurrentId} id={index++}>Question</button>
            </div>);
          })}
        </div>
    </div>
  );
}

export default History;