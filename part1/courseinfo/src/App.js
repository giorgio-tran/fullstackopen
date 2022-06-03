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

  const Header = (props) => {
    return (
      <div>
        <p>
          {props.course.name}
        </p>
      </div>
    )
  }
  

  const cont = course['parts'].map(x => <p key={x.name}> {x.name + " " + x.exercises} </p>)

  const Content = (props) => {
    return (
      <div>
          {props.cont}
      </div>
    )
  }

  const tot = course['parts'].map(x => x.exercises)
  const total = tot[0] + tot[1] + tot[2]
  const Total = (props) => {
    return (
      <div>
        <p>
          Number of exercises {props.total}
        </p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content cont={cont}/>
      <Total total={total}/>
    </div>
  )
}

export default App