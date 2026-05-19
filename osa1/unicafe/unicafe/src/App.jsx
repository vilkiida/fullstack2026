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

const Display = (props) => (
  <p>{props.text} {props.amount}</p>
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
  return (
  <div>
    <Header header='statistics'/>
    <Display text='good' amount={props.good}/>
    <Display text='neutral' amount={props.neutral}/>
    <Display text='bad' amount={props.bad}/>
    <Display text='all' amount={props.all}/>
    <Display text='average' amount={average}/>
    <Display text='positive' amount={positive.toString()+'%'}/>
  </div>
  )
}
export default App