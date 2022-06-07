const Header = ({ course }) => {
  return (
    <div>
      <p>
        {course}
      </p>
    </div>
  )
}

const Content = ({ cont }) => {
  return (
    <div>
        {cont}
    </div>
  )
}

const Total = ({ total }) => {
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

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
  

  const cont = course['parts'].map(x => <p key={x.name}> {x.name + " " + x.exercises} </p>)

  const tot = course['parts'].map(x => x.exercises)
  const total = tot[0] + tot[1] + tot[2]

  return (
    <div>
      <Header course={course.name}/>
      <Content cont={cont}/>
      <Total total={total}/>
    </div>
  )
}

export default App