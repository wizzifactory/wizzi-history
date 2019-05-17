/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\my\wizzi\v1\kernel\wizzi-boot\examples\js\ittf\react.js.ittf
    utc time: Tue, 11 Jul 2017 11:56:16 GMT
*/
'use strict';
import React from 'react';
import Note from './note';
class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.renderNote = this.renderNote.bind(this);
    }
    
    render() {
        const notes = this.props.notes;
        return  (
                <ul className="notes">
                {notes.map(this.renderNote)}
                </ul>
            );
        ;
    }
    renderNote(note) {
        return  (
                <li className="note" key={`note§{note.id}`}>
                    <Note task={note.task} onEdit={this.props.onEdit.bind(null, note.id)} onDelete={this.props.onDelete.bind(null, note.id)}>
                    </Note>
                
                </li>
            );
        ;
    }
}

