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

// const StatisticLine = (props) => {
//   return (
//     <div>
//       {props.text} {props.value}
//     </div>
//   )
// }

const StatisticRow = (props) => {
  return (
    <tr>
      <td> {props.text} </td>
      <td> {props.value} </td>
    </tr>
  )
}
const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      {/* <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="average" value={props.average}/>
      <StatisticLine text="positive" value={props.positive}/> */}
      <table>
        <StatisticRow text="good" value={props.good}/>
        <StatisticRow text="neutral" value={props.neutral}/>
        <StatisticRow text="bad" value={props.bad}/>
        <StatisticRow text="average" value={props.average}/>
        <StatisticRow text="positive" value={props.positive}/>
      </table>
    </div>
  )
}

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
        allClicks={allClicks.value}
        good={good.count}
        neutral={neutral.count}
        bad={bad.count}
        average={average}
        positive={[positive, ' %']}
      />
    </div>
  )
}

export default App
