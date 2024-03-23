import React, { useState ,useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import { useSpeechSynthesis } from 'react-speech-kit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate , useParams } from 'react-router-dom';
import axios from "axios";


function DenemeQuestion(){
    const [questionId , setQuestionId]=useState();
    const [question,setQuestion]=useState("Question");
    const [clue,setClue]=useState("There is a clue for question");
    const [answer ,setAnswer]=useState("");
    const [questionAnswer,setData]=useState([]);
    const { speak , voices } = useSpeechSynthesis();
    const [finished , setFinished] = useState(false);
    const [score , setScore] = useState(0);
    const navigate = useNavigate();
    const DenemePage = () => {
        navigate('/deneme');
    }
    const { denemeNumber } = useParams(); 
let index=1;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tests/'+denemeNumber);
                //console.log(response.data);
                if (response.status === 200){
                    // setQuestionId(response.data.question_id);
                    // setQuestion(response.data.data.question);
                    // //setClue(response.data.data.clue)
                } else {
                    console.error('Failed to fetch data from Flask using GET');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
            fetchData();
    }, [questionAnswer]);

    const sendPostRequest = async () => {

        const formData= new FormData();

        try {
            formData.append('test_id', denemeNumber)
            formData.append('question_answer', JSON.stringify(questionAnswer))
            const response = await axios.post('http://localhost:5000/api/users/addTestHistory' , formData);


            if (response.ok) {
                console.log('Data sent successfully to Flask using POST');
            } else {
                console.error('Failed to send data to Flask using POST');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    function takeAnswer(){
        setData(prevData => {
            return [...prevData, {question_id: questionId, answer: answer}];
          });
        setQuestion("");
        setAnswer("");
        if(questionAnswer.length===9){
            sendPostRequest();
            setFinished(true);
        }
    }

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
                <ArrowBackIosIcon className="arrow-back" fontSize="large" onClick={DenemePage}/>
                
                {!finished &&(
                    <>
                    <div className="interview">
                    <div className="question">
                        <textarea  rows="5" cols="100"  value={question}>{question}</textarea>
                        <VolumeUpIcon className="voice" fontSize="large" onClick={voiceText}></VolumeUpIcon>
                    </div>
                    <div className="answer">
                        <textarea  rows="8" cols="100"  placeholder="Please enter your answer here" onChange={(event)=>{setAnswer(event.target.value)}} value={answer}></textarea>
                        <MicIcon className="mic" fontSize="large" onClick={takeSpeech}></MicIcon>
                    </div>
                        <SendIcon className="sendButton" fontSize="large" onClick={takeAnswer} />
                </div>
                <div className="clue">
                    <FindInPageIcon onMouseOver={openWindow} onMouseOut={closeWindow} style={{color: 'black'}} fontSize="large"/>
                    <p id="hoverWindow">{clue}</p>
                </div>
                <div className="pass">
                    <p>Pass</p>
                    <ArrowForwardIcon onClick={takeAnswer} fontSize="large"/>
                </div>
                </>
                )}

                {finished&&(
                    <div className="score-window">
                        <p>{score}</p>
                        <ArrowForwardIcon fontSize="large" onClick={DenemePage}/>

                    </div>)
                }
            </div>
        </div>
        )
    

}

export default DenemeQuestion;    