import React, { useState } from 'react'
const Filter = ({value, onChange}) => {
  return (<p> Filter shown with <input value={value} onChange={onChange}/></p>)
}
const Person = ({person}) => {
  return (
    <li key={person.name}>{person.name} {person.phoneNumber}</li>
  )
}
const Persons = ({persons}) => {
  return (
  <ul>
  {persons.map( person => 
     <Person person = {person}/>
     )}
</ul>)
}

const PersonForm = ({onSubmit, newName, newPhoneNumber, onPhoneNumberChange, onNameChange} ) => {
 return ( <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange}/>
      phone number: <input value={newPhoneNumber} onChange={onPhoneNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
</form>)
}
const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456' },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ filterNameOption, setFilterNameOption] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlPhoneNumberChange = (event)  => {
    setNewPhoneNumber(event.target.value)
  }

  const handleNameFilterOptionChange = (event) => {
    setFilterNameOption(event.target.value)
    console.log("Filtered search ", event.target.value)
  }

  // filter the persons to show 
  // if the filterSearch exists use that, if not use original persons object
  const personsToShow = filterNameOption?persons.filter(person => person.name.toLowerCase().includes(filterNameOption.toLowerCase())):persons

  const handleSubmit = (event) => {
    event.preventDefault()
    const exists = persons.filter(person => person.name === newName).length 

    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return 
    }
    const person = {
      name: newName,
      phoneNumber: newPhoneNumber,
    }
    setPersons(persons.concat(person))
    setNewName("")
    setNewPhoneNumber("")
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {filterNameOption} onChange= {handleNameFilterOptionChange}/>
      <h3>Add New</h3>
      <PersonForm onSubmit={handleSubmit} newName={newName} newPhoneNumber={newPhoneNumber} onPhoneNumberChange ={handlPhoneNumberChange} onNameChange={handleNameChange} />
   
      <h2>Numbers</h2>
      <Persons persons = {personsToShow} />
    </div>
  )
}

export default App