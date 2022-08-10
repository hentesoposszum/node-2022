// Változók

const valtozo = 12;

let masikVal = 12;
console.log(masikVal);
masikVal = "szoveg";
console.log(masikVal);

// Típusok
console.log(typeof("asd")) // String
console.log(typeof(12)) // Number
console.log(typeof(12.3)) // Number
console.log(typeof(true)) // Boolean
console.log(typeof([1, 2, 3, "4", 5])) // Object
console.log(typeof({ a: 12, b: "szoveg" })) // Object
// + null, undefined

let obj = { a: 12, b: "szoveg" }
obj.a
obj["a"]

// function
function vmi() {
	alert("a");
}

function sum(a, b) {
	return a + b;
}

/*
if (a < b) {
	// igaz
} else if (a > b) {
	// másik igaz
} else {
	// mindkettő hamis
}

for (let i = 0; i < 10; i++) {
	// kód
	if (i == 6) {
		continue;
	}

	// ez csak akkor fut le, amikor i nem 6
}

while (a < b) {
	// kód
}

do {
	
} while (a < b);*/

let semmiEgy = undefined;
let semmiKetto = null;

console.log("vmi");
setTimeout(() => {
	console.log("másik vmi");
}, 1000);

// vagy

setTimeout(function() {
	console.log("másik vmi");
}, 1000);