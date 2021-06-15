import React from 'react'

const Persons = ({persons, nameFilter}) => {

    const personFilter = person => new RegExp(nameFilter, 'i').test(person.name)
  
    return (
      <div>
        {persons.filter(personFilter).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    )
  }

export default Persons 