const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Part = ({ name, exercise }) => {
	return (
		<p>
			{name} {exercise}
		</p>
	);
};

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} name={part.name} exercise={part.exercises} />
			))}
		</>
	);
};

const Total = ({ parts }) => {
	const total = parts.reduce((sum, part) => sum + part.exercises, 0);

	return <h3>total of {total} excersices</h3>;
};

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default Course;
