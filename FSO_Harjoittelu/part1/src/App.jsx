import { useState } from 'react'

const App = (props) => {

  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => {setCounter(counter+1)}
  const decreaseByOne = () => {setCounter(counter-1)}
  const reset = () => {setCounter(0)}


  return (
    <div>
      <Display counter={counter}/>
      <Button
        handleClick={increaseByOne}
        text="plus"
      />
      <Button
        handleClick={decreaseByOne}
        text="minus"
      />
      <Button
        handleClick={reset}
        text="reset"
      />

    </div>
    
  )
}

const Display = (props) => {
  return(
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

export default App