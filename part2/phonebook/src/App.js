import React, { useState, useEffect } from 'react'
import personService from './services/Person'
import Persons from './components/Person'

const Notification = ({message, className}) => {
  return(
    <p className={className}>{message}</p>
  ) 
}
const Filter = ({value, onChange}) => {
  return (<p> Filter shown with <input value={value} onChange={onChange}/></p>)
}

const PersonForm = ({onSubmit, newName, newNumber, onNumberChange, onNameChange} ) => {
 return ( <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange}/>
      number: <input value={newNumber} onChange={onNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
</form>)
}
const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterNameOption, setFilterNameOption] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState('')
  const [ notifcationClass, setNotificationClass] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then( initialPersons => {
        setPersons(initialPersons)
      })
    },[])
    

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlNumberChange = (event)  => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterOptionChange = (event) => {
    setFilterNameOption(event.target.value)
  }

  const deletePerson = (id) => {

    personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        console.log(persons)
      })
  }
  const addPerson = (event) => {
    event.preventDefault()
    const personToUpdate = persons.filter(person => person.name === newName)
    // if the person exist, go to updatation 
    // updated the phone number
    if (personToUpdate.length) {
      const result = window.confirm(`${newName} already exists, do you want to updated the number?`)
      if (result) {
        const changedPerson = {...personToUpdate[0], number: newNumber}
        personService
          .update(changedPerson.id, changedPerson)
          .catch(error => {
            const notificationMessage = `information of ${changedPerson.name} has been deleted from the server`
            //set notification class to error and message to the crafted message
            // class error is found in index.css 
            setNotificationClass('error')
            setNotificationMessage(notificationMessage)
            
            // reset message and class of the notification after 5 seconds.
            setTimeout(() => {
              setNotificationClass(null)
              setNotificationMessage(null)
            }, 5000)
          })
      }

      setNewName('')
      setNewNumber('')
      return 
    }
    const person = {
      name: newName,
      number: newNumber,
    }
    
    personService
      .create(person)
      .then(returnedPerson => {

        setPersons(persons.concat(returnedPerson))

        const notificationMessage = `added ${returnedPerson.name}`
        //set notification class to success and message to the crafted message
        // class success is found in index.css 
        setNotificationClass('success')
        setNotificationMessage(notificationMessage)
       
        setTimeout(() => {
        // reset message and class of the notification after 5 seconds.

          setNotificationClass(null)
          setNotificationMessage(null)
        }, 5000)

        setNewName('')
        setNewNumber('')
      })
  }


  // filter the persons to show 
  // if the filterSearch exists use that, if not use original persons object
  const personsToShow = filterNameOption?persons.filter(person => person.name.toLowerCase().includes(filterNameOption.toLowerCase())):persons

  return (
    <div>
      <Notification message ={notificationMessage} className={notifcationClass}/>
      <h2>Phonebook</h2>
      <Filter value = {filterNameOption} onChange= {handleNameFilterOptionChange}/>
      <h3>Add New</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} onNumberChange ={handlNumberChange} onNameChange={handleNameChange} />
   
      <h2>Numbers</h2>
      <Persons 
        persons = {personsToShow}
        onDelete = {deletePerson} />
    </div>
  )
}

export default App