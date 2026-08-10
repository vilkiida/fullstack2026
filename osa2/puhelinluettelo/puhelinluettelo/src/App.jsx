import { useEffect, useState } from 'react'
import personService from './services/persons'
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    if (event.target.value === '') {
      setSearchTerm(event.target.value)
      setShowAll(true)
    }
    else {
      setSearchTerm(event.target.value)
      setShowAll(false)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`) == true) {
          const oldContact = (persons.find(p => p.name === newName))
          const updatedContact = {
            name: newName,
            number: newNumber,
            id: oldContact.id
          }
          personService
            .update(oldContact.id, updatedContact)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== oldContact.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
            })

        } else {
        }
    }
    else if (persons.some(person => person.number === newNumber)) {
      alert(`the number ${newNumber} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length+1)
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))


  const handleDeleteClick = (person_to_be_removed) => {
    if (confirm(`Are you sure you want to delete ${person_to_be_removed.name} ?`) == true) {
      personService
      .remove(person_to_be_removed.id)
      setPersons(persons.filter(person => person.id !== person_to_be_removed.id))
    } else {
    }
    
    }

  return (
    <div>
      <Header text='Phonebook'/>
      <Filter searchTerm={searchTerm} 
      onChange={handleSearchChange} />
      <Header text='add a new'/>
      <PersonForm onSubmit={addPerson} newName={newName}
        newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <Header text='Numbers'/>
      <Persons personsToShow={personsToShow} handleDeleteClick={handleDeleteClick}/>
    </div>
  )
}

const Header = ({ text }) => (
  <h2>
    {text}
  </h2>
)
const Contact = ({person, handleDeleteClick}) => (
  <>
    <p>
      {person.name} {person.number} <button onClick={() => handleDeleteClick(person)}>delete</button>
    </p>
  </>
)
const Persons = ({personsToShow, handleDeleteClick}) => (
  <>
  {personsToShow.map((person) => 
    <Contact key={person.id} person={person} handleDeleteClick={handleDeleteClick}/>)}
  </>
)
const Filter = ({searchTerm, onChange}) => (
  <p>
    filter shown with <input value = {searchTerm}
    onChange = {onChange}/>
  </p>
)
const PersonForm = ({onSubmit, newName, newNumber, 
  handleNameChange, handleNumberChange}) => (
    <form onSubmit= {onSubmit}>
      <div>
        name: <input 
        value = {newName}
        onChange={handleNameChange}/>
      </div>
      <div>
        number: <input 
        value = {newNumber}
        onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

export default App