import React, { useState, useEffect } from 'react'
import phonebook from './services/phonebookService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  
  const handleNameFieldChange = (event) => setNewName(event.target.value)
  const handleNumberFieldChange = (event) => setNewNumber(event.target.value)
  const handleFilterFieldChange = (event) => setNameFilter(event.target.value)

  
  useEffect(() => {
    phonebook.getAll().then(personList => setPersons(personList))
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    
    const matchingPerson = persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase())

    if (matchingPerson !== undefined) {
      if (window.confirm(`${matchingPerson.name} already exists in the notebook, do you want to replace the old number with a new one?`)) {
        phonebook.update({...matchingPerson, number: newNumber}).then(updatedPerson => {
          const newPersons = persons.map(person => person.id === updatedPerson.id ? updatedPerson : person)
          setPersons(newPersons)
          clearFields()
        })
      }      
    } else {
      phonebook.add({ name: newName.trim(), number: newNumber }).then(newPerson => {
        setPersons(persons.concat(newPerson))
        clearFields()
      })
    }
  }

  const removeName = (name, id) => {
    if(window.confirm(`Remove ${name}?`)) {
      phonebook.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
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

      <PersonList persons={persons} nameFilter={nameFilter} removeName={removeName}/>
    </div>
  )

}

export default App
