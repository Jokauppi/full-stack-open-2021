import React from 'react'

const PersonForm = ({handleNameField, handleNumberField, handleSubmit, newName, newNumber}) => {
    return (
      <div>
        <form>
          <div>
            name: <input onChange={handleNameField} value={newName} />
          </div>
          <div>
            number: <input onChange={handleNumberField} value={newNumber} />
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>add</button>
          </div>
        </form>
      </div>
    )
  }

export default PersonForm