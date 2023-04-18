// $ npm install array-shuffle

import { Fragment } from 'react'
import { Route, Routes } from 'react-router'
import Home from './Home'
import QuestionPage from './QuestionPage'

function App() {
    return (
        <Fragment>
            <Routes>
                <Route exact path='/' element={<Home/>}></Route>
                <Route exact path='/questions' element={<QuestionPage/>}></Route>
            </Routes>
        </Fragment>
    )
}

export default App
