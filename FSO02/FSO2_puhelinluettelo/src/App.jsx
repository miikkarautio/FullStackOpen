import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [nameList, setNamelist] = useState([])

  const [newName, setNewName] = useState('')

  const checkDuplicates = () => {
    if(nameList.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    } else if(!nameList.includes(newName)){
      setNamelist(nameList.concat(newName))
      console.log(`Henkilö ${newName} on lisätty`)
    }
    setNewName('')
  }

  const addNewName = () => {
    checkDuplicates();
    const personObject = {
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddButton = (event) => {
    event.preventDefault();
    addNewName();
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleAddButton}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <p key={person.name}>{person.name}</p>
        )}
      </div>
    </div>
  )

}

export default App