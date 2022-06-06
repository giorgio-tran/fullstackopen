import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.action}>
      {props.text}
    </button>
  )
}

const AnecdoteLine = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
}

const VoteCounts = (props) => {
  return (
    <div>
      has {props.counter} votes
    </div>
  )
}

const MainComponent = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <AnecdoteLine text={props.text}/>
      <VoteCounts counter={props.counter} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState({
    index: 0, arr: Array(anecdotes.length).fill(0)
  })

  //selects a random anecdote
  const nextAnecdote = () => {
    const random =  Math.floor(Math.random() * anecdotes.length)
    setSelected({...selected, index: random})
  }
  //adds one to array at selected position
  const vote = () => {
    const copy = selected.arr
    copy[selected.index] += 1
    setSelected({...selected, arr: copy})
    console.log(selected.arr)
  }
  
  //obtaining max value
  const max = Math.max(...selected.arr)
  //obtaining index of item with max value
  const index = selected.arr.indexOf(max)

  return (
    <div>
      <MainComponent 
        title="Anecdote of the Day"
        text={anecdotes[selected.index]}
        counter={selected.arr[selected.index]}
      />

      <Button 
        action={nextAnecdote} 
        text="next anecdote"
      />
      <Button 
        action={vote} 
        text="vote"
      />

      <MainComponent 
        title="Anecdote with Most Votes" 
        text={anecdotes[index]} 
        counter={max}
      />
    </div>
  )
}

export default App