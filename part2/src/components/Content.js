import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => 
<>
  <Part
    part={parts[0]} 
  />
  <Part
    part={parts[1]} 
  />
  <Part
    part={parts[2]} 
  />      
  <Part
    part={parts[3]}
  />
  <Total 
    parts={parts}
    exercises={parts.exercises} 
  />
</>

export default Content