const h1 = document.querySelector("h1");

h1.innerText = "vmi más";

document.querySelector("#azon").addEventListener("click", function() {
	h1.classList.toggle("zold");

	document.querySelector("vmis").value;

	const p = document.createElement("p");
	p.innerText = "bekezdés";
	document.querySelector("#beszuras").appendChild(p);
});

const img = document.querySelector("img");
img.src = "masik érték";
