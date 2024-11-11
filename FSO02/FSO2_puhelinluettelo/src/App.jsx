import { useState } from 'react'

const Filter = (props) => {
  return(
    <>
      <p>Filter shown with <input value={props.newSearch} onChange={props.handleSearch}/></p>
    </>
  )
}

const PersonForm = (props) => {
  return(
    <>
      <form>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>  
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div>
          <button type="submit" onClick={props.handleAddButton}>add</button>
        </div>
      </form>
    </>
  )
}

const Persons = (props) => {
  return(
    <>
        {props.matchedPersons.map(person =>
          <p key={person.name}>{person.name} {person.number} </p>
        )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [matchedPersons, setMatchedPersons] = useState(persons)

  
  const checkDuplicates = () => {
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      console.log(persons)
      return true
    } else if(!persons.some(person => person.name === newName)){
      setPersons(persons.concat(newName))
      console.log(`Henkilö ${newName} on lisätty`)
      return false
    }
  }

  const addNewPerson = () => {
    //If there's duplicates clear fields, and return
    if(checkDuplicates()) {
      setNewName('')
      setNewNumber('')
      return;
    }
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setMatchedPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const searchPerson = () => {
    setMatchedPersons(persons.filter(person => 
      person.name.toLowerCase().includes(newSearch.toLowerCase())))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    searchPerson();
  }

  const handleAddButton = (event) => {
    event.preventDefault();
    addNewPerson();
  }





  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm
      newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      handleAddButton={handleAddButton}/>
      <h2>Numbers</h2>
      <Persons matchedPersons={matchedPersons}/>
    </div>
  )

}



export default App