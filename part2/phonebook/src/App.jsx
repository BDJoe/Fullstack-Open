import { useState, useEffect } from "react";
import personService from "./services/persons";

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

const Persons = ({ namesToShow, deletePerson }) => {
	return (
		<>
			{namesToShow.map((person) => (
				<Person
					key={person.id}
					name={person.name}
					number={person.number}
					id={person.id}
					handleClick={() => deletePerson(person)}
				/>
			))}
		</>
	);
};

const Person = ({ name, number, id, handleClick }) => {
	return (
		<div key={id}>
			{name} {number} <button onClick={handleClick}>delete</button>
		</div>
	);
};

const ErrorNotification = ({ message }) => {
	if (message === null) {
		return null;
	}

	return <div className='error'>{message}</div>;
};

const SuccessNotification = ({ message }) => {
	if (message === null) {
		return null;
	}

	return <div className='success'>{message}</div>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setsearchName] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const addName = (event) => {
		event.preventDefault();
		if (persons.find((person) => person.name === newName)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const person = persons.find((person) => person.name === newName);
				const personObject = { ...person, number: newNumber };
				personService
					.update(person.id, personObject)
					.then((returnedPerson) => {
						setSuccessMessage(`Number for ${person.name} has been updated`);
						setTimeout(() => {
							setSuccessMessage(null);
						}, 5000);
						setPersons(
							persons.map((person) =>
								person.id !== personObject.id ? person : personObject
							)
						);
						setNewName("");
						setNewNumber("");
					})
					.catch((error) => {
						setErrorMessage(
							`Information of ${person.name} was already removed from server`
						);
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
					});
			} else {
				setNewName("");
				setNewNumber("");
			}
		} else {
			const personObject = { name: newName, number: newNumber };
			personService.create(personObject).then((returnedPerson) => {
				setSuccessMessage(`Added ${returnedPerson.name}`);
				setTimeout(() => {
					setSuccessMessage(null);
				}, 5000);
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
			});
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

	const handleDeletePerson = (person) => {
		console.log(`deleted ${person.id}`);
		if (window.confirm(`Delete ${person.name}?`)) {
			personService
				.deletePerson(person.id)
				.then(() => setPersons(persons.filter((n) => n.id !== person.id)));
		}
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
			<ErrorNotification message={errorMessage} />
			<SuccessNotification message={successMessage} />
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
			<Persons
				namesToShow={namesToShow}
				deletePerson={(person) => handleDeletePerson(person)}
			/>
		</div>
	);
};
export default App;
