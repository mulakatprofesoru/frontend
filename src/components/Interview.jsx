import React, { useState ,useEffect } from "react";
import { useNavigate  ,  useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import { useSpeechSynthesis } from 'react-speech-kit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

function Interview(){
    const [questionId , setQuestionId]=useState();
    const [question , setQuestion]=useState("Question");
    const [clue , setClue]=useState("There is a clue for question");
    const [answer , setAnswer]=useState(null);
    const [questionAnswer , setData]=useState({questionData:question ,answerData:null});
    const { speak , voices } = useSpeechSynthesis();
    const navigate = useNavigate();
    const HomePage = () => {
        navigate("/");
    }

    const { interviewType } = useParams(); 
    const formData = new FormData();
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/questions/random/'+interviewType);
            if (response.status === 200){
                setQuestionId(response.data.data.question_id);
                setQuestion(response.data.data.question);
                //setClue(response.data.data.clue)
            } else {
                console.error('Failed to fetch data from Flask using GET');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    //GET
    useEffect(() => { fetchData(); } , []);

    // POST
    const sendPostRequest = async () => {
        try {
            formData.append("answer", answer);
            formData.append("question_id", questionId);
            const response = await axios.post('http://localhost:5000/api/users/addTrainingHistory',formData);
            if (response.status === 200) {
                console.log('Data sent successfully to Flask using POST');
            } else {
                console.error('Failed to send data to Flask using POST');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setAnswer("");
        fetchData();
    };

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
        } = useSpeechRecognition();
    
    if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
    }
    
    function takeSpeech(){
        SpeechRecognition.startListening({ language: 'tr' });
        setAnswer(transcript);
    }
        
    const voiceText = () => {
        speak({ text: question , voice:voices[1]});
    };

    function openWindow() {
        var hoverWindow = document.getElementById("hoverWindow");
        hoverWindow.style.display = "block";
    }
    
    function closeWindow() {
        var hoverWindow = document.getElementById("hoverWindow");
        hoverWindow.style.display = "none";
    }
    
    return(
        <div>
            <header>
                <h1><a href="/">Mülakat Profesörü</a></h1>
            </header>
            <div className="container">
                <ArrowBackIosIcon className="arrow-back" fontSize="large" onClick={HomePage}/>
                <div className="interview">
                    <div className="question">
                        <textarea  rows="5" cols="100"  value={question}>{question}</textarea>
                        <VolumeUpIcon className="voice" fontSize="large" onClick={voiceText}></VolumeUpIcon>
                    </div>
                    <div className="answer">
                        <textarea  rows="8" cols="100"  placeholder="Please enter your answer here" onChange={(event)=>{setAnswer(event.target.value)}} value={answer}></textarea>
                        <MicIcon className="mic" fontSize="large" onClick={takeSpeech}></MicIcon>
                    </div>
                        <SendIcon className="sendButton" fontSize="large" onClick={sendPostRequest} />
                </div>
                <div className="clue">
                    <FindInPageIcon onMouseOver={openWindow} onMouseOut={closeWindow} style={{color: 'black'}} fontSize="large"/>
                    <p id="hoverWindow">{clue}</p>
                </div>
                <div className="pass">
                    <p>Pass</p>
                    <ArrowForwardIcon onClick={fetchData} fontSize="large"/>
                </div>
            </div>
        </div>
    );

}

export default Interview;    