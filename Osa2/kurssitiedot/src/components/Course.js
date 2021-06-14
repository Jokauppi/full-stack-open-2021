import React from 'react'

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
		</div>
	)
}

const Header = ({ course }) => (
	<h2>{course}</h2>
)

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(part => <Part key={part.id} part={part} />)}
			<Total parts={parts} />
		</div>
	)
}

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
)

const Total = ({ parts }) => (
	<p>
		<b>
			total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises
		</b>
	</p>
)

export default Course