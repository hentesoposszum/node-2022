document.querySelector("button").addEventListener("click", function() {
	window.location = "/new-todo.html";
});

fetch("/teendok")
.then(function(data) {
	return data.json();
}).then(function(todos) {
	const container = document.querySelector("#todo-container");
	
	for (let i = 0; i < todos.length; i++) {
		const div = document.createElement("div");
		div.classList.add("todo-item");

		const p = document.createElement("p");
		p.innerText = todos[i].text;

		const btn = document.createElement("button");
		btn.innerText = "X";

		div.appendChild(p);
		div.appendChild(btn);
		container.appendChild(div);
	}
});