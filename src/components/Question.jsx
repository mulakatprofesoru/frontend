import React, { useState ,useEffect } from "react";
import Speech from 'react-speech';
import SendIcon from '@mui/icons-material/Send';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';


function Question(){
  const [question,setQuestion]=useState(null);
  const [answer ,setAnswer]=useState(null);
  const [questionAnswer,setData]=useState({questionData:question ,answerData:null});
 
  //GET
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/questions/random');
            if (response.ok) {
                const data = await response.json();
                setQuestion(data.data.question);
            } else {
                console.error('Failed to fetch data from Flask using GET');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    fetchData();
}, []);

// POST
const sendPostRequest = async () => {
    setData(()=>{return {answerData:answer,questionData:question}});
    try {
        const response = await fetch('http://localhost:5000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({answerData:answer,questionData:question}),
        });

        if (response.ok) {
            console.log('Data sent successfully to Flask using POST');
        } else {
            console.error('Failed to send data to Flask using POST');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    setQuestion("");
    setAnswer("");
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
 
  return(
      <div className="question">
          <div>
              <textarea id="kutu1" rows="5" cols="100" placeholder="Question" value={question}>{question}</textarea>
              <Speech text={question}/>
          </div>
          <div>
              <textarea id="kutu2" rows="8" cols="100" placeholder="Please enter your answer for question" onChange={(event)=>{setAnswer(event.target.value)}} value={answer}></textarea>
              <p>Microphone: {listening ? 'on' : 'off'}</p>
              <MicIcon  className="question" onClick={takeSpeech}></MicIcon>
              {/* <p>{transcript}</p> */}
              <SendIcon fontSize="large" onClick={sendPostRequest} />
          </div>
      </div>
  );
}

export default Question;    