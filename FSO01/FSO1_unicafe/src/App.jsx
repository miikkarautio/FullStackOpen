import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const Good = () => setGood(good + 1)
  const Neutral = () => setNeutral(neutral + 1)
  const Bad = () => setBad(bad + 1)

  const All = ({good, neutral, bad}) => {
    let all = good + neutral + bad
    return(
      <p>All: {all}</p>
    )
  }

  const Average = ({good, neutral, bad}) => {
    const total = good + neutral + bad 
    const average = (good * 1 + neutral * 0 + bad * -1) / total || 0
    return(
      <p>Average: {average}%</p>
    )
  }

  const Positive = ({good, all}) => {
    const positive = (good/all) * 100 || 0
    return(
      <p>Positive: {positive}%</p>
    )
  }
  


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={Good}>Good</button>
      <button onClick={Neutral}>Neutral</button>
      <button onClick={Bad}>Bad</button>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <All good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} all={good + neutral + bad} />
    </div>
  )
}

export default App