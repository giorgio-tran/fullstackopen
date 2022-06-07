import React from 'react'
import Part from './Part'
import Total from './Total'
import Course from './Course'

const Content = ({ courses }) => 
<>
  {console.log(courses)}
  <Course
    course={courses[0]}
    name={courses[0].name}
  />
  <Part
    part={courses[0].parts[0]} 
  />
  <Part
    part={courses[0].parts[1]} 
  />
  <Part
    part={courses[0].parts[2]} 
  />      
  <Part
    part={courses[0].parts[3]}
  />
  <Total 
    parts={courses[0].parts}
    exercises={courses[0].parts} 
  />

<Course
    course={courses[1]}
    name={courses[1].name}
  />
  <Part
    part={courses[1].parts[0]} 
  />
  <Part
    part={courses[1].parts[1]} 
  />
   <Total 
    parts={courses[1].parts}
    exercises={courses[1].parts} 
  />
  
</>

export default Content