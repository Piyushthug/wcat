#!/usr/bin/env node

const fs = require("fs");
let arguments = process.argv.slice(2);
let flags = [];
let filenames = [];
let secondaryArguments = [];

for (let i of arguments) {
	if (i[0] == "-") {
		flags.push(i);
	} else if (i[0] == "$") {
		secondaryArguments.push(i.slice(1));
	}

	else {
		filenames.push(i);
	}
}

if (flags[0] == "-ap") {
	
	let fileData = "\n";
	fileData += fs.readFileSync(filenames[1], "utf-8");
	
	
	fs.appendFile(filenames[0], fileData, function (err) {
		if (err) throw err;
		console.log(`\nFile appended from ${filenames[1]} to ${filenames[0]}`);
	});
}

else if (flags[0] === "-cc") {

	fs.readdirSync(__dirname).forEach(file => {
		if (file == filenames[1]) {
			let fullName = file.split(".");
			let fN = fullName[0].split("_");
			if (fN[1] == null) {

				fN[1] = 1;
				file = fN[0] + "_" + fN[1] + "." + fullName[1];
			} else {
				fN[1]++;
				file = fN[0] + "_" + fN[1] + "." + fullName[1];
			}
			filenames[1] = file;

		}
	});
	fs.copyFile(filenames[0], filenames[1], (err) => {
		if (err) {
			console.log("Error Found:", err);

		}
		else {
			console.log(`\nFile Contents copied form ${filenames[0]} to ${filenames[1]}`);

		}
	});

} else {

	for (let file of filenames) {
		let fileData = fs.readFileSync(file, "utf-8");


		for (let flag of flags) {

			if (flag == "-rs") {
				fileData = removeAll(fileData, " ");
			}
			if (flag == "-rn") {
				fileData = removeAll(fileData, "\r\n");
			}
			if (flag == "-rsc") {
				for (let secondaryArgument of secondaryArguments) {
					fileData = removeAll(fileData, secondaryArgument);
				}

			}
			if (flag == "-s") {
				fileData = serializing(fileData);
			}
			if (flag == "-sn") {
				fileData = serializingNoLine(fileData);
			}
			if (flag == "-rxn") {
				fileData = remveXtraLine(fileData);
				console.log("as");
			}

		}
		console.log(fileData);

	}
}


//"scripts":{"wcat": "node index.js}
//"bin" :{"wcat": "index.js"} at top 
//#!/usr/bin/env node
//npm link
//


function removeAll(string, removalData) {
	return string.split(removalData).join("");
}

function serializing(string) {
	let eachline = string.split("\r\n");
	for (let i = 0; i < eachline.length; i++) {
		eachline[i] = [i + 1] + ". " + eachline[i] + "\n";
	}
	return eachline.join("");
}

function serializingNoLine(string) {
	let eachline = string.split("\r\n");
	let count = 1;
	for (let i = 0; i < eachline.length; i++) {
		if (eachline[i] != "") {
			eachline[i] = count + ". " + eachline[i] + "\n";
			count++;
		}

	}

	return eachline.join("");
}

function remveXtraLine(string) {
	let eachline = string.split("\r\n");
	let data = [];
	for (let i = 1; i < eachline.length; i++) {
		if (eachline[i] == "" && eachline[i - 1] == "") {
			eachline[i] = null;

		}
		if (eachline[i] == "" && eachline[i - 1] == null) {
			eachline[i] = null;
		}
	}

	for (let i = 0; i < eachline.length; i++) {
		if (eachline[i] != null) {
			data.push(eachline[i]);
		}
	}

	let count = 1;
	for (let i = 0; i < data.length; i++) {

		data[i] = count + ". " + data[i] + "\n";
		count++;

	}

	return data.join("");
}


//H.W copy file 1 to file 2
// append file 2 in file 1