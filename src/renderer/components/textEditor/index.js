import React from 'react';
//import MonacoEditor from 'react-monaco-editor'; // Reference: https://github.com/superRaytin/react-monaco-editor

export default class TextEditor extends React.Component {
    state = {
        value: '',
        language: '',
        editor: null
    };

    options = {
        minimap: {
            enable: false
        },
        selectOnLineNumbers: true,
        theme: 'vs-dark'
    };

    get visible() {
        return this.state.value && this.state.language;
    }

    get code() {
        return this.state.value;
    }

    editorDidMount(editor, monaco) {
        editor.focus();
        this.editor = editor;
    }

    render() {
        return (
            <div className="TextEditor">

            </div>
        );
    }
}
