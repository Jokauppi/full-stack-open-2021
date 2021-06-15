import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Jarkko Joku',
      number: '+358 111 1111'
    },
    {
      name: 'Matti Meikäläinen',
      number: '+358 222 2222'
    },
    {
      name: 'Esko Esimerkki',
      number: '+358 333 3333'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  
  const handleNameFieldChange = (event) => setNewName(event.target.value)
  const handleNumberFieldChange = (event) => setNewNumber(event.target.value)
  const handleFilterFieldChange = (event) => setNameFilter(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber })
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
    
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        handleFilter={handleFilterFieldChange}
        nameFilter={nameFilter}  
      />

      <h3>Add new number</h3>

      <PersonForm
        handleNameField={handleNameFieldChange}
        handleNumberField={handleNumberFieldChange}
        handleSubmit={addName}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} nameFilter={nameFilter}/>
    </div>
  )

}

export default App
