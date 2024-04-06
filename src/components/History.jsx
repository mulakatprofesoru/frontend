import React, { useState , useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import HistoryHelperBox from "./HistoryHelperBox";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";

function History(){
  const [modal,setModal] = useState(false);
  const [testScore,setTestScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [testQuestions, setTestQuestions] = useState(["" , "","" , "","" , "","" , "","" , ""]);
  const [tests, setTests] = useState([]);
  const [history , setHistory] = useState([]); 
  const [historyPressed, setHistoryPressed] = useState(true);
  const [testPressed, setTestPressed] = useState(false);
  const [currentHistoryId, setCurrentHistorytId] = useState(-1);
  const [currentHistoryIdForQuestionBox, setCurrentHistorytIdForQuestionBox] = useState(-1);
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
      score: history[event.target.id].score
    });
    openModal(event.target.id);  
  };

  const getCurrentIdForTest = (event , data) => {
    console.log("data:" ,data);
    setCurrentHistory({
      question: data.question,
      userAnswer : data.user_answer,
      answer: data.correct_answer,
      score: data.question_score
    });
    openModal(event.target.id);  
  };

  const handleHistoryButtonClick = () => {
    setHistoryPressed(true);
    setTestPressed(false);
    closeModal();
    setCurrentHistorytIdForQuestionBox(-1);
    setCurrentHistoryPage("Training");
  };

  const handleTestButtonClick = () => {
    setTestPressed(true);
    setHistoryPressed(false);
    closeModal();
    setCurrentHistoryPage("Test");
  };

  function closeModal(){
    var box= document.getElementById("helper-box");
    box.style.display = "none";
    setModal(false);
    setCurrentHistorytId(-1);
  }

  function openModal(id){
    var box= document.getElementById("helper-box");
    if(currentHistoryId ===-1){
      setCurrentHistorytId(id);
      box.style.display = "block";
    }else if(id === currentHistoryId ){
      setCurrentHistorytId(id);
      if(!modal){
        box.style.display = "none";
      }
      else{
        box.style.display = "block";
      }
      setModal(!modal);
    }
    else{    
      if(modal){
        setModal(false);
      }
      setCurrentHistorytId(id);
      box.style.display = "block";
    }
  }

  const navigate = useNavigate();
  
  const HomePage = () => {
      setCurrentHistoryPage("Training");
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
        response.data.data.forEach(element => {
            setTests(prevValue =>{return [...prevValue,element]});
        });
      }
    } catch (error) {
      console.error('Error:', error); 
    }
  }

  useEffect(()=> {getTrainHistory();getTestHistory();} ,[]);


  function handleTestQuestion(event,test){
    setTestQuestions(test.questions);
    setTestScore(test.test_score);
    var box= document.getElementById("question-box");
    if(currentHistoryIdForQuestionBox ===-1){
      setCurrentHistorytIdForQuestionBox(event.target.id);
      box.style.display = "flex";
    }else if(event.target.id === currentHistoryIdForQuestionBox ){
      if(!modal){
        box.style.display = "none";
        closeModal();
      }
      else{
        box.style.display = "flex";
      }
      setModal(!modal);
    }
    else{    
      if(modal){
        setModal(false);
      }
      setCurrentHistorytIdForQuestionBox(event.target.id);
      box.style.display = "flex";
      closeModal();
    }
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
      <HistoryHelperBox
              question={currentHistory.question}
              userAnswer={currentHistory.userAnswer}
              answer={currentHistory.answer}
              skor={currentHistory.score}
            />
      {
        currentHistoryPage === "Training" ? (
          <>
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
                  <button style={{fontSize:"larger", width:"300px"}} onClick={(event) => handleTestQuestion(event, test)}  id={index}>Deneme {index}</button>
                </div>);
              })}
            </div>

              <div id="question-box">
                {testQuestions.map((data , index) => {
                  return(
                    <button className="button" onClick={(event) =>{getCurrentIdForTest(event,data)}} id={index}>Soru {index+1}</button>
                  );
                })}
                <button className="button" >Score: {testScore}</button>
                
              </div>
          </>)
      }
    </div>
  );
}

export default History;