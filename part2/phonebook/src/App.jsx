import { useState } from "react";

const Filter = ({ searchName, handleSearchName }) => {
	return (
		<div>
			filter shown with{" "}
			<input type='text' value={searchName} onChange={handleSearchName} />
		</div>
	);
};

const PersonForm = ({
	addName,
	newName,
	handleAddName,
	newNumber,
	handleAddNumber,
}) => {
	return (
		<form onSubmit={addName}>
			<div>
				name: <input value={newName} onChange={handleAddName} />
			</div>
			<div>
				number: <input value={newNumber} onChange={handleAddNumber} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

const Persons = ({ namesToShow }) => {
	return (
		<>
			{namesToShow.map((person) => (
				<Person key={person.name} name={person.name} number={person.number} />
			))}
		</>
	);
};

const Person = ({ name, number }) => {
	return (
		<div key={name}>
			{name} {number}
		</div>
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setsearchName] = useState("");

	const addName = (event) => {
		event.preventDefault();
		if (persons.find((person) => person.name === newName)) {
			console.log("contains");
			alert(`${newName} is already added to phonebook`);
		} else {
			const personObject = { name: newName, number: newNumber };
			setPersons(persons.concat(personObject));
			setNewName("");
			setNewNumber("");
		}
	};

	const handleAddName = (event) => {
		setNewName(event.target.value);
	};

	const handleAddNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchName = (event) => {
		setsearchName(event.target.value);
	};

	const namesToShow =
		searchName === ""
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().includes(searchName.toLowerCase())
			  );

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchName={searchName} handleSearchName={handleSearchName} />
			<h3>Add a new</h3>
			<PersonForm
				addName={addName}
				newName={newName}
				handleAddName={handleAddName}
				newNumber={newNumber}
				handleAddNumber={handleAddNumber}
			/>
			<h3>Numbers</h3>
			<Persons namesToShow={namesToShow} />
		</div>
	);
};

export default App;
