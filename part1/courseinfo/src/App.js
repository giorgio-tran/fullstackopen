const App = () => {
  const course = 'Half Stack application development'
  const Header = (props) => {
    return (
      <div>
        <p>
          {props.course}
        </p>
      </div>
    )
  }
  
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={props.part1} />
        <Part part={props.part2} />
        <Part part={props.part3} />
      </div>
    )
  }

  const total = part1.exercises + part2.exercises + part3.exercises
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
      <Content 
        part1={part1}  
        part2={part2} 
        part3={part3} 
      />
      <Total total={total}/>
    </div>
  )
}

export default App