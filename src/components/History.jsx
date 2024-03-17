import React, { useState } from "react";
import HistoryHelperBox from "./HistoryHelperBox";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function History(){
  const [modal,setModal] = useState(false);
  const [notes, setNotes] = useState([ " ",  " ",  " ", " ",  " ", " ",  " ", " ", " "," ", " ",  " ",  " ", " ",  " ", " ",  " ", " ", " "," "]);
  const {user} = useAuth0();

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

  return(
    <div class="scrollable-window">
      <HistoryHelperBox
        question={notes.question}
        userAnswer={notes.userAnswer}
        answer={notes.answer}
        skor={notes.skor}
      />
      
      {notes.map(() => {
        return(
        <div class="history-container">
          <button onClick={openModal}>Question1</button>
        </div>);
      })}
    </div>
  );
}

export default History;