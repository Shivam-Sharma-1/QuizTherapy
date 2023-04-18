import { Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { Context } from "./Context";

function Home() {
    const {formData, handleChange, restartGame} = useContext(Context)
    const {noOfQues, categoryId, difficulty} = formData

    return (
        <Fragment>
            <div className="home">
                <h1 className="home--title">QuizTherapy</h1>
                <h3 className="home--subtitle">Let's test your knowledge, shall we?</h3>
                <label htmlFor="noOfQues">Select the number of questions</label>
                <input 
                    type="number" 
                    name="noOfQues" 
                    id="noOfQues" 
                    max={50} min={0} 
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    value={noOfQues}
                />
                <label htmlFor="category">Select the category</label>
                <select 
                    name="category" 
                    id="category"
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    value={categoryId}
                >
                    <option value="">Any Category</option>
                    <option value={9}>General Knowledge</option>
                    <option value={10}>Books</option>
                    <option value={11}>Film</option>
                    <option value={12}>Music</option>
                    <option value={13}>Musicals and Theatres</option>
                    <option value={14}>Television</option>
                    <option value={15}>Video Games</option>
                    <option value={16}>Board Games</option>
                    <option value={17}>Science and Nature</option>
                    <option value={18}>Computers</option>
                    <option value={19}>Mathematics</option>
                    <option value={20}>Mythology</option>
                    <option value={21}>Sports</option>
                    <option value={22}>Geography</option>
                    <option value={23}>History</option>
                    <option value={24}>Politics</option>
                    <option value={25}>Art</option>
                    <option value={26}>Celebtrities</option>
                    <option value={27}>Animals</option>
                    <option value={28}>Vehicles</option>
                    <option value={29}>Comics</option>
                    <option value={30}>Gadgets</option>
                    <option value={31}>Anime and Manga</option>
                    <option value={32}>Cartoons</option>
                </select>
                <label htmlFor="difficulty">Select the difficulty</label>
                <select 
                    name="difficulty" 
                    id="difficulty"
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    value={difficulty.value}
                >
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <Link to='/questions'>
                    <button className="btn--start" onClick={restartGame}>
                        Start quiz
                    </button>
                </Link>
            </div>
        </Fragment>
    )
}

export default Home