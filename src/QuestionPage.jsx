import { Fragment, useContext, useEffect, useState } from "react"
import QuestionCard from "./components/QuestionCard"
import { Context } from "./Context"
import { nanoid } from 'nanoid'
import arrayShuffle from "array-shuffle"
import { Link } from "react-router-dom"

function QuestionPage() {
    const {formData, data, setData,isGameOver, setIsGameOver, score, setScore, restartGame} = useContext(Context)
    const {noOfQues, difficulty, categoryId} = formData
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState('')
    let questionData = ''
    let option = []
    
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://opentdb.com/api.php?amount=${noOfQues}&type=multiple&difficulty=${difficulty.toLowerCase()}&category=${categoryId}&encode=base64`)
            .then(res => res.json())
            .then(info => setData(info.results.map(item => {
                option = item.incorrect_answers.map((opt) => b64_to_utf8(opt))
                option.push(b64_to_utf8(item.correct_answer))
                return ({
                    id: nanoid(),
                    question: b64_to_utf8(item.question),
                    options: arrayShuffle(option).map(item => {
                        return {
                            id: nanoid(),
                            optionText: item
                        }
                    }),
                    selectedAnswer: {undefined},
                    correctAnswer: b64_to_utf8(item.correct_answer)
                })
            })))
            .then(() => setIsLoading(false))
            .catch(error => setIsError(error))
    }, [])

    useEffect(() => {
        data.map(ques => {
            ques.options.map(opt => {
                if(ques.correctAnswer === opt.optionText && ques.selectedAnswer === opt.id) setScore(prev => prev+1)
            })
        })
    }, [isGameOver])

    function selectedAnswer(quesId, optId) {
        setData(() => {
            return (
                data.map(item => {
                    if(quesId === item.id) {
                        return {...item, selectedAnswer: optId}
                    } else {
                        return item
                    }
                })
            )
        })
    }

    function b64_to_utf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }
    
    if(data) {
        questionData = data.map((item, index) => {
            return (<QuestionCard 
                id= {item.id}
                question= {item.question}
                options= {item.options}
                selectedAnswer= {selectedAnswer}
                correctAnswer= {item.correctAnswer}
                quesData ={item}
            />)
        })
    }


    return (
        <div className="questionPage">
            {isLoading && 
                <div class="loader">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    <div class="bar4"></div>
                    <div class="bar5"></div>
                    <div class="bar6"></div>
                    <div class="bar7"></div>
                    <div class="bar8"></div>
                    <div class="bar9"></div>
                    <div class="bar10"></div>
                    <div class="bar11"></div>
                    <div class="bar12"></div>
                </div>}
            {isError && <pr>{JSON.stringify(isError)}</pr>}
            {!isError && !isLoading &&
                <Fragment>
                    <h1 className="page--header">{isGameOver ? 'You did well!' : 'All the best!'}</h1>
                    {questionData}
                    {!isGameOver ? 
                    <div className="btn--container">
                        <button className="btn--checkAns" onClick={() => setIsGameOver(true)}>
                            Check answers
                        </button>
                    </div>
                    :
                    <div className="result--container">
                        <h2 className="result--text">You scored {score}/{noOfQues} correct answers!</h2>
                        <Link to='/'>
                            <button className="btn--restartGame" onClick={restartGame}>
                                Play again
                            </button>
                        </Link>
                    </div>}
                </Fragment>
            }
        </div>
    )
}

export default QuestionPage