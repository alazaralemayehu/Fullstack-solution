import React from 'react'

const Person = ({person}) => {
    return (
      <p key={person.name}>{person.name} {person.number}</p>
    )
  }
const Persons = ({persons, onDelete}) => {
return (
<ul>
    {persons.map( person => 
    <li key={person.id}>
        <Person person = {person}/>
        <button onClick={() => onDelete(person.id)}>Delete</button>
    </li>

        )}
</ul>)
}

  export default Persons