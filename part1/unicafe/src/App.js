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

const Statistics = props => (
  <div>
    <div>{props.good} {props.goodCount}</div>
    <div>{props.neutral} {props.neutralCount}</div>
    <div>{props.bad} {props.badCount}</div>
    <div>{props.average} {props.averageNum}</div>
    <div>{props.positive} {props.positiveNum}</div>
  </div>
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
    setGood({value: good.value, count: good.count + 1})
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
  const positive =  good.count / allClicks.value.length * 100

  return (
    <div>
      <Header text="Give Feedback" />
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad"/>
      <Header text="Statistics" />
      <Statistics
        good="good" goodCount={good.count}
        neutral="neutral" neutralCount={neutral.count}
        bad="bad" badCount={bad.count}
        average="average" averageNum={average}
        positive="positive" positiveNum={[positive, ' %']}
      />
    </div>
  )
}

export default App
