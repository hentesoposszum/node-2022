// az új teendő gombra kattintáshoz hozzárendel egy functiont
// (ez minden kattintásnál le fog futni)
document.querySelector("button").addEventListener("click", function() {
	// átirányítás a new-todo.html-re
	window.location = "/new-todo.html";
});

// összes teendő lekérése
fetch("/teendok")
.then(function(data) {
	// JSON-ként kapjuk meg a választ, ezt vissza kell alakítani rendes
	// JS objectre
	return data.json();
}).then(function(todos) {
	// külső div lekérése
	const container = document.querySelector("#todo-container");
	
	// minden teendőn végigmegy
	for (let i = 0; i < todos.length; i++) {
		// egész teendő itemet tároló div létrehozása
		const div = document.createElement("div");
		div.classList.add("todo-item"); // rárakjuk a classt

		// ebbe a p-be jön maga a teendő szövege
		const p = document.createElement("p");
		p.innerText = todos[i].text; // p szövegét átállítjuk a teendő szövegére

		// ez a gomb végül nem csinál semmit rip
		const btn = document.createElement("button");
		btn.innerText = "X";

		div.appendChild(p); // szöveg hozzáadása a todo item-et tároló divhez
		div.appendChild(btn); // gomb hozzáadása (y tho? idk)
		container.appendChild(div); // todo item hozzáadása containerhez
	}
});