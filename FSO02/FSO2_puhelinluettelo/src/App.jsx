import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'



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
          <p key={person.name}>{person.name} {person.number} <button onClick={() => props.handleDelete(person.id, person.name)}>Delete</button></p>
        )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [matchedPersons, setMatchedPersons] = useState(persons)


//Fetch persons from db.json
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
        setMatchedPersons(persons)
      })
  }, [])

  
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

    personService
      .create(personObject)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setMatchedPersons(persons.concat(addedPerson))
      })

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

  const handleDelete = (id, name) => {
    if(window.confirm(`Do you really want to delete ${name}?`)){
      personService
      .deletePerson(id)
      .then(() => {
        setMatchedPersons(persons.filter(person => person.id !== id));
        setPersons(persons.filter(person => person.id !== id));
      })
    } else{
      return
    }
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
      <Persons matchedPersons={matchedPersons} handleDelete={handleDelete}/>
    </div>
  )

}



export default App