const Course = ({course}) => {
  return (
    <div>
      <Subtitle title={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

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

export default Course