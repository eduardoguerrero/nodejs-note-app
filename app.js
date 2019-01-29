const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions = {
	describe: 'Title of the note',
	demand: true,
	alias: 't'
};

const bodyOptions = {
	describe: 'Body of the note',
	demand: true,
	alias: 'b'
}

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions,
	})
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.help()
	.argv;


var command = process.argv[2];

if (command == 'add') {
	var note = notes.addNote(argv.title, argv.body)
	if (note) {
		console.log('Note created');
		notes.logNote(note);
	} else {
		console.log('Note title taken');
	}
} else if (command == 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`)
	allNotes.forEach((note) => {
		notes.logNote(note);
	});
} else if (command == 'read') {
	var note = notes.getNote(argv.title);
	if (note) {
		console.log('Note found');
		notes.logNote(note);
	} else {
		console.log('Note not found');
	}
} else if (command == 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : 'Note not found';
	console.log(message);
} else {
	console.log('command not recognized');
}


//Add note
//node app.js add --help
//node app.js add --title="title" --body="body note"
//node app.js add  -t="title2" -b="body note"

//List notes
//node app.js list

//Remove note
//node app.js remove --help
//node app.js remove -t=title
//node app.js remove --title="title2"

//Read note
//node app.js read
//node app.js read --title="title"
//node app.js read -t="title"
