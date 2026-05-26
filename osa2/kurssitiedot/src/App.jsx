const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}
const Header = (props) => (
  <h1>
    {props.header}
  </h1>
)
const Content = ({parts}) => (
  <div>
      {parts.map((part, i)=> 
        <Part key={i} content={part}/>
      )}
    <Total parts={parts}/>
  </div>
)
const Part = ({content}) => (
  <li>
    <p>{content.name} {content.exercises}</p>
  </li>
)
const Total = ({parts}) => {
  const total = parts.reduce(function(sum, part) {
    return sum + part.exercises
  }, 0)
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}


export default App