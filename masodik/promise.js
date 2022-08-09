function wait() {
	return new Promise(function(resolve, reject) {
		reject("hiba");
		return;
		
		setTimeout(function() {
			console.log("promiseon belül");

			resolve();
		}, 1000);
	});
}

console.log("első")

wait()
.then(function() {
	console.log("második");

	return wait();
})
.then(function() {
	console.log("harmadik");

	return wait();
})
.then(function() {
	console.log("negyedik");

	return wait();
})
.catch(function(error) {
	console.log(error)
})

console.log("asd")