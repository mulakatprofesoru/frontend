import React from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function HistoryHelperBox (props){

    return(
            <div id="helper-box">
                <p>{props.question}</p>
                <p>{props.userAnswer}</p>
                <p>{props.answer}</p>
                <p>{props.skor}</p>
            </div>
    );
}

export default HistoryHelperBox;