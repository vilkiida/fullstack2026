import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(true)

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <div>
        <Header text='Phonebook'/>
        <p>filter shown with <input value = {searchTerm}
          onChange = {handleSearchChange}/>
        </p>
      </div>
      <div>
        <Header text='add a new'/>
        <form onSubmit= {addPerson}>
          <div>
            name: <input 
            value = {newName}
            onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value = {newNumber}
            onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <div>
        <Header text='Numbers'/>
        {personsToShow.map((person, i) => 
          <Contact key={i} name={person.name} number={person.number}/>)}
      </div>
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


export default App