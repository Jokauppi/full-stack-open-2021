import React, { useState, useEffect } from 'react'
import phonebook from './services/phonebookService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState({main: 'green', back: 'lightgreen'})


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

          setNotificationColor({ main: 'green', back: '#ccffcc'})
          setNotificationMessage(`Updated ${updatedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }).catch((error) => {
          setPersons(persons.filter(person => person.id !== matchingPerson.id))

          setNotificationColor({ main: 'firebrick', back: '#ffcccc'})
          setNotificationMessage(`${matchingPerson.name} has already been removed from the server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }      
    } else {
      phonebook.add({ name: newName.trim(), number: newNumber }).then(newPerson => {
        setPersons(persons.concat(newPerson))
        clearFields()
        setNotificationColor({ main: 'green', back: '#ccffcc'})
        setNotificationMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }).catch(error => {
        console.log(error.response.data)
        setNotificationColor({ main: 'firebrick', back: '#ffcccc'})
          setNotificationMessage(error.response.data.error)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      })
    }
  }

  const removeName = (name, id) => {
    if(window.confirm(`Remove ${name}?`)) {
      phonebook.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))

        setNotificationColor({ main: 'green', back: '#ccffcc'})
        setNotificationMessage(`Removed ${name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
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

      <Notification message={notificationMessage} color={notificationColor} />

      <h3>Numbers</h3>

      <PersonList persons={persons} nameFilter={nameFilter} removeName={removeName}/>
    </div>
  )

}

export default App
