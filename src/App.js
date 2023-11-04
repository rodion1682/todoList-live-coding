/**
 * Tasks
 * 1. Make it possible to add new todos. New todos can't be empty.
 *    A new todo item should appear at the top of the list.
 * 2. Implement deleting a todo item
 * 3. Implement marking a todo item as "done". The "done" items should stay in the list but
 *    have a horizontal line displayed that crosses the items.
 *
 * Bonus task: Make the items stay preserved when the page is reloaded (Hint: storage).
 */

import { useEffect, useState } from 'react';
import './App.css';

const List = ({ todos, handleDelete, handleMarkAsDone }) => {
	return (
		<ul className="todoList">
			{todos.map((todo) => (
				<li key={todo.id}>
					<div className="todoItemContainer">
						<span className={todo.selected ? 'selected' : ''}>
							{todo.text}
						</span>
						<span className="todoItemActions">
							<button onClick={() => handleMarkAsDone(todo.id)}>
								Mark done
							</button>
							<button onClick={() => handleDelete(todo.id)}>
								Delete
							</button>
						</span>
					</div>
				</li>
			))}
		</ul>
	);
};

const initialState = [
	{ id: 0, text: 'fix the text bug', selected: false },
	{ id: 1, text: 'meeting with the PM', selected: false },
	{ id: 2, text: 'check the design', selected: false },
];

function App() {
	const [todoList, setTodoList] = useState(() => {
		const storedData = localStorage.getItem('todoList');
		return storedData ? JSON.parse(storedData) : initialState;
	});

	const [input, setInput] = useState('');

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.length !== 0) {
			setTodoList([
				{ id: todoList.length, text: input, selected: false },
				...todoList,
			]);
		}
	};

	useEffect(() => {
		localStorage.setItem('todoList', JSON.stringify(todoList));
	}, [todoList]);

	const handleDelete = (index) => {
		setTodoList(
			todoList.filter((item) => {
				return item.id !== index;
			})
		);
	};

	const handleMarkAsDone = (index) => {
		const arrayCopy = [...todoList];

		arrayCopy.map((todo) => {
			if (todo.id === index) {
				return (todo.selected = !todo.selected);
			}
			return todo;
		});

		setTodoList(arrayCopy);
	};

	return (
		<div className="App">
			<form>
				<label htmlFor="todo">New todo </label>
				<br />
				<input
					type="text"
					id="todo"
					name="todo"
					value={input}
					onChange={handleInput}
				/>
				<br />
				<br />
				<input type="submit" value="Submit" onClick={handleSubmit} />
			</form>
			<h3>Todos</h3>
			<List
				todos={todoList}
				handleDelete={handleDelete}
				handleMarkAsDone={handleMarkAsDone}
			/>
		</div>
	);
}

export default App;
