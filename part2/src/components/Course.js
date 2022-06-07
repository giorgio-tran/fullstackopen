import React from 'react'
import Total from './Total'
import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => 
<>
  {console.log(courses)}
  <Header
    course={courses[0]}
    name={courses[0].name}
  />
  <Content
    parts={courses[0].parts}
  />
  <Total 
    parts={courses[0].parts}
    exercises={courses[0].parts} 
  />

<Header
    course={courses[1]}
    name={courses[1].name}
  />
<Content
    parts={courses[1].parts} 
  />
<Total 
    parts={courses[1].parts}
    exercises={courses[1].parts} 
  />  
</>

export default Course