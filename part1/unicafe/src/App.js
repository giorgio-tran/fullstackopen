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

const Div = props => (
  <div>{props.text} {props.number}</div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState({
    value: 1, count: 0
  })
  const [neutral, setNeutral] = useState({
    value: 0, count: 0
  })
  const [bad, setBad] = useState({
    value: -1, count: 0
  })
  const [allClicks, setAll] = useState({
    value: [], count: 0
  })

  //good
  const handleGood = () => {
    console.log('value', good.value)
    console.log('count', good.count)
    setGood({value: good.value, count: good.count + 1})
    console.log('allClicks val', allClicks.value)
    console.log('allClicks count', allClicks.count)
    setAll({value: allClicks.value.concat(good.value), count: allClicks.count + 1})
  }
  //neutral
  const handleNeutral = () => {
    setNeutral({value: neutral.value, count: neutral.count + 1})
    setAll({value: allClicks.value.concat(neutral.value), count: allClicks.count + 1})
  }
  //bad
  const handleBad = () => {
    setBad({value: bad.value, count: bad.count + 1})
    setAll({value: allClicks.value.concat(bad.value), count: allClicks.count + 1})
  }
  //all
  const average = allClicks.value.reduce((a, b) => a + b, 0) / allClicks.value.length
  //positive reviews
  const positive =  good.count / allClicks.value.length

  return (
    <div>
      <Header text="Give Feedback" />
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad"/>
      <Header text="Statistics" />
      <Div text="good" number={good.count} />
      <Div text="neutral" number={neutral.count} />
      <Div text="bad" number={bad.count} />
      <Div text="all" number={allClicks.count} />
      <Div text="average" number={average} />
      <Div text="positive" number={[positive, ' %']} />
    </div>
  )
}

export default App
