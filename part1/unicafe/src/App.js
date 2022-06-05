import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Header = props => (
  <h1>{props.text}</h1>
)

const Rate = props => (
  <p>{props.rating} {props.count}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  //good
  const setToGood = () => {
    console.log('good', good)
    setGood(good + 1)
  }
  //neutral
  const setToNeutral = () => {
    console.log('neutral', neutral)
    setNeutral(neutral + 1)
  }

  //bad
  const setToBad = () => {
    console.log('bad', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text="Give Feedback" />
      <Button onClick={setToGood} text="good"/>
      <Button onClick={setToNeutral} text="neutral" />
      <Button onClick={setToBad} text="bad"/>
      <Header text="Statistics" />
      <Rate rating="good" count={good} />
      <Rate rating="neutral" count={neutral} />
      <Rate rating="bad" count={bad} />
    </div>
  )
}

export default App
