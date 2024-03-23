import React, { useState , useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import HistoryHelperBox from "./HistoryHelperBox";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";

function History(){
  const [modal,setModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [testQuestions, setTestQuestions] = useState(["" , "","" , "","" , "","" , "","" , ""]);
  const [tests, setTests] = useState(["" , "" ,""]);
  const [history , setHistory] = useState([]); 
  const [historyPressed, setHistoryPressed] = useState(true);
  const [testPressed, setTestPressed] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [currentHistoryPage, setCurrentHistoryPage] = useState("Training");
  const [currentHistory, setCurrentHistory]=useState({
    question : "",
    userAnswer : "",
    answer : "",
    score : ""});
  
  
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
    setTestPressed(false);
    setModal(false); 
    setCurrentHistoryPage("Training");
  };

  const handleTestButtonClick = () => {
    setTestPressed(true);
    setHistoryPressed(false);
    setModal(false);
    setCurrentHistoryPage("Test");
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

  async function getTrainHistory(){
    try {
      var response = await axios.get("http://localhost:5000/api/users/getTrainingHistory");
      if(response.status === 200){
          setHistory(response.data.data);
          setQuestions(()=>{
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


  async function getTestHistory(){
    try {
      var response = await axios.get("http://localhost:5000/api/users/getTestHistory");
      if(response.status === 200){
        console.log(response.data.data);
          // setHistory(response.data.data);
          // setQuestions(()=>{
          //   let data=[]
          //   for (let i = 0; i < response.data.data.length; i++) {
          //     data[i]="";
          //   }
          //   return data;
          // });
      }
    } catch (error) {
      console.error('Error:', error); 
    }
  }

  useEffect(()=> {getTrainHistory()} ,[]);


  function handleTestQuestion(event){
    setTestQuestions(["","",""]);
    //setTestQuestions(tests[event.target.id]);
    var box= document.getElementById("question-box");
    if(modal){
      box.style.display = "none";
    }
    else{
      box.style.display = "flex";
    }
    setModal(!modal);
  }

  return(
    <div>
      <header>
        <h1><a href="/">Mülakat Profesörü</a></h1>
        <div className="history-buttons">
          <button className={historyPressed ? 'button pressed' : 'button'}
            onClick={handleHistoryButtonClick} >Eğitim Geçmişi</button>
          <button className={testPressed ? 'button pressed' : 'button'}
            onClick={handleTestButtonClick}>Deneme Geçmişi</button>
        </div>
      </header>

      <ArrowBackIosIcon className="arrow-back" fontSize="large" onClick={HomePage}/>
      
      {
        currentHistoryPage === "Training" ? (
          <>
            <HistoryHelperBox
              question={currentHistory.question}
              userAnswer={currentHistory.userAnswer}
              answer={currentHistory.answer}
              skor={currentHistory.score}
            />
            <div className="scrollable-window">
              {questions.map((note, index) => {
                return (
                  <div key={index} className="history-container">
                    <button style={{ fontSize: "larger" }} onClick={getCurrentId} id={index++}>
                      Soru
                    </button>
                  </div>
                );
              })}
            </div>
          </>
          ) : 
          (<>
            <div className="scrollable-window1">
              {tests.map((test , index) => {
                return(
                <div key={index} className="history-container">
                  <button style={{fontSize:"larger"}} onClick={handleTestQuestion} id={index}>Deneme {index}</button>
                </div>);
              })}
            </div>

              <div id="question-box">
                {testQuestions.map((note , index) => {
                  return(
                    <button className="button" onClick={getCurrentId} id={index}>Soru {index+1}</button>
                  );
                })}
              </div>
          </>)
      }
    </div>
  );
}

export default History;