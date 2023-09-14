import { useState } from "react";

const Header = () => <h1>give feedback</h1>;

const Button = ({ handeClick, text }) => {
	return <button onClick={handeClick}>{text}</button>;
};

const Stat = ({ count, text }) => {
	return (
		<p>
			{text} {count}
		</p>
	);
};

const Statistics = ({ good, bad, neutral }) => {
	const average = () => {
		const score = good - bad;
		const average = score / (good + neutral + bad);
		return average;
	};

	const positive = () => {
		const percent = good / (good + neutral + bad);
		return percent * 100;
	};
	if (good > 0 || neutral > 0 || bad > 0) {
		return (
			<>
				<h1>statistics</h1>
				<table>
					<tbody>
						<tr>
							<td>
								<Stat text='good' count={good} />
							</td>
						</tr>
						<tr>
							<td>
								<Stat text='neutral' count={neutral} />
							</td>
						</tr>
						<tr>
							<td>
								<Stat text='bad' count={bad} />
							</td>
						</tr>
						<tr>
							<td>
								<Stat text='all' count={good + neutral + bad} />
							</td>
						</tr>
						<tr>
							<td>
								<Stat text='average' count={average()} />
							</td>
						</tr>
						<tr>
							<td>
								<Stat text='positive' count={positive() + " %"} />
							</td>
						</tr>
					</tbody>
				</table>
			</>
		);
	}
	return <p>No feedback given</p>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleClick = (type, setType) => {
		setType(type + 1);
	};

	return (
		<div>
			<Header />
			<Button handeClick={() => handleClick(good, setGood)} text='good' />
			<Button
				handeClick={() => handleClick(neutral, setNeutral)}
				text='neutral'
			/>
			<Button handeClick={() => handleClick(bad, setBad)} text='bad' />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
