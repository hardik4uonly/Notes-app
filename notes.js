const fs = require('fs')
const chalk = require('chalk')

const getNotes = ()=> 'Your notes...'

const addNote = (title, body)=> {
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=> note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = (notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title)=>{
    console.log(title)
    const notes = loadNotes()
    const notestokeep = notes.filter((note)=> note.title !== title )
    if(notes.length !== notestokeep.length) {
        saveNotes(notestokeep)
        console.log('note removed')
    }else{
        console.log('note not found')
    }
}

const listNotes = function(){ 
    console.log(chalk.inverse.red('your notes are : '))
    const notes = loadNotes()
    debugger
    notes.forEach((note) => {
        console.log(chalk.green(JSON.stringify(note)))
    });
}


const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const readNote = (title)=>{
    const notes = loadNotes()
    const Available = notes.find((note)=> note.title === title)
    if(Available){
        console.log(Available.body)
    }else{
        console.log('note not found')
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}