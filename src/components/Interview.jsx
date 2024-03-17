import React, { useState ,useEffect } from "react";
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


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/questions/random');
            if (response.status === 200){
                setQuestionId(response.data.question_id);
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
            const response = await axios.post('http://localhost:5000/api/data', {
                answerData: answer,
                questionData: question
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
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
        <div className="container">
            <ArrowBackIosIcon className="arrow-back" fontSize="large"/>
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
            <ArrowForwardIcon onClick={fetchData} fontSize="large" className="arrow-forward"/>
        </div>
    );

}

export default Interview;    