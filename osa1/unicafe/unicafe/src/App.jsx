import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood)
    setAll(updatedAll)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1
    setBad(updatedBad)
    setAll(updatedAll)
  }
 
  return (
    <div>
      <Feedback good={handleGoodClick} neutral={handleNeutralClick} bad={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}
const Header = (props) => (
  <h2>
    {props.header}
  </h2>
  )
const Button = (props) => (
  <button onClick = {props.onClick}>{props.text}</button>
)

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)

const Feedback = (props) => (
  <div>
    <Header header="give feedback"/>
    <Button onClick={props.good} text='good'/>
    <Button onClick={props.neutral} text='neutral'/>
    <Button onClick={props.bad} text='bad'/>
  </div>
)
const Statistics = (props) => {
  const average = (1 * props.good + 0 * props.neutral + -1 * props.bad)/props.all
  const positive = props.good / props.all
  if (props.all > 0) {
    return (
    <div>
      <Header header='statistics'/>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={props.all}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive.toString()+'%'}/>
    </div>
    )
  }
  else {
    return (
      <div>
        <Header header='statistics'/>
        <p>No feedback given</p>
      </div>
    )
    
  }
}
export default App