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

  const parts = [
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

  // const Part = (props) => {
  //   console.log(props)
  //   return (
  //     <div>
  //       <p>
  //         {props.parts} {props.part.exercises}
  //       </p>
  //     </div>
  //   )
  // }
  const cont = parts.map(x => <p key={x.name}> {x.name + " " + x.exercises} </p>)

  const Content = (props) => {
    return (
      <div>
          {props.cont}
      </div>
    )
  }

  const tot = parts.map(x => x.exercises)
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