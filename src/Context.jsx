import { createContext, useState } from "react";

const Context = createContext()

function ContextProvider(props) {
    const [formData, setFormData] = useState({
        noOfQues: 5,
        category: '',
        difficulty: '',
        categoryId: '',
    })
    const [data, setData] = useState([])
    const [isGameOver, setIsGameOver] = useState(false)
    const [score, setScore] = useState(0)

    function handleChange(e) {
        const {name, value} = e.target
        if(name === 'category') {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: e.target[event.target.selectedIndex].text,
                    categoryId: e.target.value
                }
            })
        } else {
            setFormData(prevFormData => {
                return {
                    ...prevFormData, 
                    [name]: value
    
                }
            })
        }
    }

    function restartGame() {
        setIsGameOver(false)
        setScore(0)
    }

    return (
        <Context.Provider
            value={{
                formData, handleChange, data, setData, isGameOver, setIsGameOver, score, setScore, restartGame
            }}>
                {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}