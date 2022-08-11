fetch("/bejegyzesek")
.then(function(data) {
	return data.json();
}).then(function(bejegyzesek) {
	for (let i = 0; i < bejegyzesek.length; i++) {
		const div = document.createElement("div");
		div.classList.add("post");

		const h2 = document.createElement("h2");
		h2.innerText = bejegyzesek[i].cim;

		const p = document.createElement("p");
		p.innerText = bejegyzesek[i].tartalom;

		div.appendChild(h2);
		div.appendChild(p);

		document.querySelector("#post-container").appendChild(div);
	}
});

document.querySelector("button").addEventListener("click", function() {
	window.location = "/uj-bejegyzes.html";
});