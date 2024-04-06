import React from "react";

function HistoryHelperBox (props){

    return(
            <div id="helper-box">
                <p><span className="question-label">Q: </span>{props.question}</p>
                <p><span className="question-label">UA: </span>{props.userAnswer}</p>
                <p><span className="question-label">A: </span>{props.answer}</p>
                <p><span className="question-label">S: </span>{props.skor}</p>
            </div>
    );
}

export default HistoryHelperBox;