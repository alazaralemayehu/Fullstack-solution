import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map((el)=>0))
  const [mostVoted , setMostVoted ] = useState(0)

  const getRandomNumber = () => {
    const limit = anecdotes.length
    const randomNumber = Math.floor((Math.random() * limit))
    return randomNumber

  }

  const handleVote = (votedValue) => {


    const copyOfVote = [...votes]
    copyOfVote[votedValue] +=1
    if (copyOfVote[votedValue] > copyOfVote[mostVoted]) {
      setMostVoted(votedValue)
    }
    setVotes(copyOfVote)
    console.log(mostVoted)
  }

  const nextAncedotes = () => {
    const randomNumber = getRandomNumber()
    setSelected(randomNumber)
  }
  return (
    <div>
     <p>
        {props.anecdotes[selected]}
     </p>
     <p>
      has {votes[selected]} votes
     </p>
      
      <button onClick={() => handleVote(selected)}>Vote</button>
      <button onClick={nextAncedotes}>Next Anecdotes </button>

      <h1> Most Voted Anecdotes is</h1>
      <p>
        {props.anecdotes[mostVoted]}
      </p>
      <p>
        has {votes[mostVoted]} votes

      </p>
    </div>

  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)