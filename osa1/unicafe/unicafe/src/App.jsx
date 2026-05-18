import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }
 
  return (
    <div>
      <Feedback good={handleGoodClick} neutral={handleNeutralClick} bad={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
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
const Statistics = (props) => (
  <div>
    <Header header='statistics'/>
    <Display text='good' amount={props.good}/>
    <Display text='neutral' amount={props.neutral}/>
    <Display text='bad' amount={props.bad}/>
  </div>
)
export default App