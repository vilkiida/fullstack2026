const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <Header header='Web development curriculum'/>
      {courses.map((course, i)=> 
        <Course key={i} course={course}/>
      )}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Subtitle title={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}
const Header = ({header}) => (
  <h1>
    {header}
  </h1>
)
const Subtitle = ({title}) => (
  <h2>
    {title}
  </h2>
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