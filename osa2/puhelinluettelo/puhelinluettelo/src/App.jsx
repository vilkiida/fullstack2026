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
      alert(`${newName} is already added to phonebook`)
    }
    else if (persons.some(person => person.number === newNumber)) {
      alert(`the number ${newNumber} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

const Header = ({ text }) => (
  <h2>
    {text}
  </h2>
)
const Contact = ({name, number}) => (
  <>
    <p>{name} {number}</p>
  </>
)
const Persons = ({personsToShow}) => (
  <>
  {personsToShow.map((person, i) => 
    <Contact key={i} name={person.name} number={person.number}/>)}
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