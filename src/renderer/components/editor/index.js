/**
 * @file 编辑器主体
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'

import React from 'react';
import {inject, observer} from 'mobx-react';
import TextEditor from '../textEditor';

export default class Editor extends React.Component {
    state = {
        body: {
            width: 0,
            height: 0
        }
    };

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.updateDimensions();
        });
        this.updateDimensions();
    }

    updateDimensions() {
        const { clientHeight, clientWidth } = this.refs.editor;
        const width = clientWidth;
        const height = clientHeight - 36;
        this.setState({ body: { width, height } });
    }

    render() {
        return (
            <div className="Editor" ref="editor">
                <div className="editorView">
                    <TextEditor></TextEditor>
                </div>
            </div>
        );
    }
}
