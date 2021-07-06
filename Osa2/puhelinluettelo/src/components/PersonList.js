import React from 'react'

const PersonList = ({ persons, nameFilter, removeName }) => {

  const personFilter = person => person.name.toLowerCase().includes(nameFilter.toLowerCase())

  return (
    <div>
      {persons.filter(personFilter).map(person => <Person person={person} removeName={() => removeName(person.name, person.id)} key={person.id} />)}
    </div>
  )
}

const Person = ({ person, removeName }) => {
  return (
    <div>
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={removeName}>remove</button>
      </div>
    </div>
  )
}

export default PersonList
