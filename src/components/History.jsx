import React, { useState } from "react";
import HistoryHelperBox from "./HistoryHelperBox";

function History (){
  const [modal,setModal] = useState(false);
  const [notes, setNotes] = useState([ " ",  " ",  " ", " ",  " ", " ",  " ", " ", " "," ", " ",  " ",  " ", " ",  " ", " ",  " ", " ", " "," "]);

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
        question={"Soru"}
        userAnswer={"Kullanıcı cevabı"}
        answer={"cevap"}
        skor={"skor"}
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