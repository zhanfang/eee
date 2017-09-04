import React from 'react';
import MonacoEditor from '../../lib/react-monaco-editor'; // Reference: https://github.com/superRaytin/react-monaco-editor
import './styles.css'

export default class TextEditor extends React.Component {
    state = {
        value: 'test',
        language: 'javascript',
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
                <MonacoEditor
                    {...this.state}
                    options={this.options}
                    onChange={(value) => this.setState({ value })}
                    editorDidMount={(editor, monaco) => this.editorDidMount(editor, monaco)}
                />
            </div>
        );
    }
}
