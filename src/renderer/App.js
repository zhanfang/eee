/**
 * @file 主页面
 * @author zhanfang(fzhanxd@gmail.com)
 */

import React from 'react';
import {inject, observer} from 'mobx-react';
import Editor from './components/editor';
import './App.css';
import DevTools from 'mobx-react-devtools';
import loader from './lib/react-monaco-editor/monaco-loader'

@inject('view')
@observer
export default class App extends React.Component {

    get style() {
        const {view: {width, height}} = this.props;
        return {width, height: (height - 44)};
    }

    componentDidMount() {
        loader().then(monaco => {
            console.log(monaco);
        })
    }

    render() {
        return (
            <div className='App'>
                <div className="body" style={this.style}>
                    <Editor/>
                </div>
                <DevTools />
            </div>
        );
    }
}
