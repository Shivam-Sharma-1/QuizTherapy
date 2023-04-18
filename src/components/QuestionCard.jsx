import { useContext } from "react"
import { Context } from "../Context"


function QuestionCard(props) {
    const {isGameOver} = useContext(Context)

    function styledButton(option, id) {
        if(isGameOver) {
            if(props.quesData.correctAnswer === option) {
                return {
                    backgroundColor: "#94D7A2"
                }
            } else {
                return (props.quesData.selectedAnswer === id ? {backgroundColor: "#F8BCBC"} : {backgroundColor: "#F5F7FB"})
            }
        } else 
        {
            return (props.quesData.selectedAnswer === id ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"})
        }
    }

    const options = props.quesData.options.map((opt, index) => {
        return (
            <button 
                className={`options`}
                style={styledButton(opt.optionText, opt.id)}
                key={opt.id} 
                onClick={() => props.selectedAnswer(props.id, opt.id)}
            >
                <p className="options--text">{opt.optionText}</p>
            </button>
        )
    })

    return (
        <div className="card">
            <h2 className="card--question" id={props.id}>{props.question}</h2>
            <div className="options--container">
                {options}
            </div>
        </div>
    )
}

export default QuestionCard