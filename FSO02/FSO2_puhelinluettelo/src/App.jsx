import { useState } from 'react'

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

  const [matchedPersons, setMatchedPersons] = useState([{}])

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

  const searchPerson = () => {
    setMatchedPersons(persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())))
  }

  const addNewPerson = () => {
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
    setNewName('')
    setNewNumber('')
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

  const SearchedPerson = () => {
    return(
      <>
        {matchedPersons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </>
    )
  }

  const handleAddButton = (event) => {
    event.preventDefault();
    addNewPerson();
  }

  



  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filter shown with <input value={newSearch} onChange={handleSearch}/></p>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>  
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit" onClick={handleAddButton}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
{/*       <div>
        {persons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div> */}
      <SearchedPerson/>
    </div>
  )

}

export default App