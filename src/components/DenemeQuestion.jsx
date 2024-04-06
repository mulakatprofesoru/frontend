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
import { SyncLoader } from "react-spinners";
import axios from "axios";


function DenemeQuestion(){
    const [questionId , setQuestionId]=useState();
    const [question,setQuestion]=useState("Question");
    const [questions,setQuestions]=useState(null);
    const [clue,setClue]=useState("");
    const [clues,setClues]=useState([]);
    const [answer ,setAnswer]=useState("");
    const [questionAnswer,setData]=useState([]);
    const { speak , voices } = useSpeechSynthesis();
    const [finished , setFinished] = useState(false);
    const [score , setScore] = useState(0);
    const [index , setIndex] = useState(1);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const DenemePage = () => {
        navigate('/deneme');
    }
    const { denemeNumber } = useParams(); 
    const formDataForHint = new FormData();
    
    async function helper(question){
        try {
            formDataForHint.set("question",question.question);
            const responseForHint= await axios.post("http://localhost:5000/api/chatgpt/hint" , formDataForHint);
            if(responseForHint.status===200){
                setClues(prevData =>{
                    return [...prevData,{question:question.question , clue:responseForHint.data.message , questionId:question.questionId}]});
            }else{
                console.log("Failed to fetcg hint");
            }
        } catch (error) { 
        }
    }

    async function  getHint(questions){
        questions.forEach(question => {
           helper(question);
        });

    } 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tests/'+denemeNumber);
                if (response.status === 200){
                    setQuestion(response.data.data[0].question);
                    formDataForHint.append("question",response.data.data[0].question);
                    const responseForHint=await axios.post("http://localhost:5000/api/chatgpt/hint" , formDataForHint)
                    setQuestions(response.data.data);
                    setQuestionId(response.data.data[0].questionId);
                    if(responseForHint.status===200){
                        setClue(responseForHint.data.message)
                    }else{
                        console.log("Failed to fetcg hint");
                    }
                } else {
                    console.error('Failed to fetch data from Flask using GET');
                }
                getHint(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }

        };
            fetchData();
    }, []);

    const sendPostRequest = async () => {
        const formData= new FormData();
        setLoading(true);

        try {
            formData.append('test_id', denemeNumber);
            formData.append('question_answer', JSON.stringify(questionAnswer));
            console.log(formData.get('question_answer'));
            const response = await axios.post('http://localhost:5000/api/users/addTestHistory' , formData);

            if (response.statusText ==="OK") {
                setScore(response.data.score);
                console.log(response.data);
                setLoading(false);
                console.log('Data sent successfully to Flask using POST');
            } else {
                console.error('Failed to send data to Flask using POST');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    function takeAnswer(){
        //console.log(clues);
        if(index<11){
            setData(prevData => {return [...prevData, {question_id: questionId, answer: answer}];});
            setAnswer("");
            if(index<10){
                setClue(clues[index].clue);
                setQuestion(clues[index].question);
                setQuestionId(clues[index].questionId);
            }else{
                let temp=questionAnswer;
                temp[9]={question_id: questionId, answer: answer};
                setData(temp);
                sendPostRequest();
                setFinished(true);
            }
            setIndex(prevData =>{return(prevData+1);});
        }
    }

    const {
        transcript,
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
                    <p>Soruyu Atla</p>
                    <ArrowForwardIcon onClick={takeAnswer} fontSize="large"/>
                </div>
                </>
                )}

                {(finished && loading)&&(
                <div className="loading2">
                    <SyncLoader
                        size={20}
                    />
                    <p>Yükleniyor...</p>
                </div>
                )}
             
                {(finished&&!loading)&&(
                    <div className="score-window">
                        <p style={{margin: "auto",marginTop: "5px" ,marginBottom:"10px",}}>Deneme Puanı</p>
                        <p style={{marginTop: "10px", marginBottom:"20px"}}>{score}</p>
                        <ArrowForwardIcon fontSize="large" onClick={DenemePage}/>

                    </div>)
                }
            </div>
        </div>
        )
    

}

export default DenemeQuestion;    