import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = ({onClick, text}) => {
  return(
  <button onClick={onClick}> 
    {text}
  </button> 
  )
}

const Statistic = (props) => {
  const {text, value } = props
  let metrics = ""
  if ( text === "positive") {
     metrics =  "%"
  }
  return(
    <tr>
      <td>{text} </td>
      <td>{ value} {metrics}</td> 
    </tr>
  )
}

const Statistics = (props) => {
  const {good, bad, neutral} = props
  const total = good + bad + neutral
  console.log(total)
  if (total === 0) {
    return (
      <p>No Feedback given</p>
    )
  }
  const average = (good *1 + bad* -1)/total
  const positive = 100 *(good )/total

  return (
    <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="total" value={total}/>

          <Statistic text="average" value={average.toFixed(1)}/>
          <Statistic text="positive" value={positive.toFixed(1)}/>
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const  handleGoodClick= async () => {
    setGood(good + 1)
  }

  const handleBadClick= async () => {
    setBad(bad + 1)
    
  }
  const handleNeutralClick= async () => {
    setNeutral(neutral + 1)
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)