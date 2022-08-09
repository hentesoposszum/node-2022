function wait() {
	return new Promise(function(resolve, reject) {		
		setTimeout(function() {
			resolve();
		}, 1000);
	});
}

vmi().then(function() {
	console.log("harmadik");
});

console.log("független")

async function vmi() {
	console.log("első")
	await wait();

	console.log("második")
	/*
	Hibakezelés:
	try {

	} catch (err) {

	}
	
	vagy

	await wait().catch
	*/
}