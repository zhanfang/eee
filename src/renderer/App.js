/**
 * @file 主页面
 * @author zhanfang(fzhanxd@gmail.com)
 */

import React from 'react';
import {inject, observer} from 'mobx-react';
import Editor from './components/editor';
import Sidebar from './components/sidebar';
import StatusBar from './components/statusBar';
import './App.css';
import DevTools from 'mobx-react-devtools';

@inject('view')
@observer
export default class App extends React.Component {

    get style() {
        const {view: {width, height}} = this.props;
        return {width, height: (height - 22)};
    }

    render() {
        return (
            <div className='App'>
                <div className="body" style={this.style}>
                    <Sidebar />
                    <Editor />
                </div>
                <StatusBar />
                <DevTools />
            </div>
        );
    }
}
