import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = ({onClick, text}) => {
  return(
  <button onClick={onClick}> 
    {text}
  </button> 
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [positiveFeedback, setPositiveFeedback] = useState(0)
  const [all , setAll] = useState(0)

  const handleGoodClick= () => {
    setGood(good + 1)
    calculateTotal()
  }

  const handleBadClick= () => {
    setBad(bad + 1)
    calculateTotal()
    
  }

  const handleNeutralClick= () => {
    setNeutral(neutral + 1)
    calculateTotal()
    calculateAverage()
    calculatePositiveFeedback()
  }

  const calculateTotal = () => {
    setAll(all + 1)
  }
  const calculateAverage = () => {
    const average = (good * 1  + bad * (-1) + neutral * 0) / all
    setAverage(average)
  }
  const calculatePositiveFeedback = () => {
    const positiveFeedback = 100 * good / all
    setPositiveFeedback(positiveFeedback)
  }
  return (
    <>
      <h1>Give Feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text="good"/>
        <Button onClick={handleNeutralClick} text="neutral"/>
        <Button onClick={handleBadClick} text="bad"/>
      </div>

      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p> 
      <p>All {all}</p>
      <p>Average {average}%</p>
      <p>Positive {positiveFeedback} %</p>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)