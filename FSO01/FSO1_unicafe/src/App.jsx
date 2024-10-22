import { useState } from 'react'

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}:</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


const Statistics = (props) => {

  let all = props.good + props.neutral + props.bad

  let average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / all || 0

  let positive = (props.good/all) * 100 || 0


  
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <>
      <h1>Statistics</h1> 
      <p>No feedback given</p>
      </>
    )
  } else {
    return(
      <>
       <h1>Statistics</h1> 
        <table>
          <tbody>
            <StatisticsLine text="good" value={props.good}/>
            <StatisticsLine text="neutral" value={props.neutral}/>
            <StatisticsLine text="bad" value={props.bad}/>
            <StatisticsLine text="All" value={all}/>
            <StatisticsLine text ="Average" value={average}/>
            <StatisticsLine text ="Positive" value={positive+"%"}/>
          </tbody>
        </table>
      </>
    )
  }


}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const Good = () => setGood(good + 1)
  const Neutral = () => setNeutral(neutral + 1)
  const Bad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={Good}text="Good" />
      <Button handleClick={Neutral}text="Neutral" />
      <Button handleClick={Bad}text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App