import { useState } from "react";

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
	const [mostPoints, setMostPoints] = useState({ value: 0, index: 0 });
	const getRandomInt = () => {
		setSelected(Math.floor(Math.random() * anecdotes.length));
	};

	const setVote = () => {
		const copy = [...points];
		copy[selected] += 1;
		setPoints(copy);
	};

	const getMostVoted = () => {
		let mostVotes = { ...mostPoints };
		points.forEach((value, index) => {
			if (value > mostPoints.value) {
				mostVotes.value = value;
				mostVotes.index = index;
				setMostPoints(mostVotes);
			}
		});
		setMostPoints(mostVotes);
	};

	const handleVoteClick = () => {
		setVote();
		getMostVoted();
	};

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>has {points[selected]} votes</p>
			<Button handleClick={() => handleVoteClick()} text={"vote"} />
			<Button handleClick={() => getRandomInt()} text={"next anecdote"} />
			<h1>Anecdote with most votes</h1>
			{anecdotes[mostPoints.index]}
		</div>
	);
};
export default App;
