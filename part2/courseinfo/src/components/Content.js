import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
	console.log('parts', parts)
		//returns 
		const content = parts.map(part => {
			console.log(part)
			return (
					<Part
						key={part.id}
						part={part} 
					/>
			)
	})
	return (
		<>
			{content}
		</>
	)

}

export default Content