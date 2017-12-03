/**
 * @file 文件夹目录树形结构
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'

import React from 'react'
import Icon from '../icon';
import ItemFile from './file';
import ItemFolder from './folder';
import * as Action from '../../common/actions';
import './styles.css';

export default class FileTree extends React.Component {
    state = {
        collapsed: false,
        files: [],
        folders: []
    }

    childFolders = {};

    limitText = 20;

    get iconName() {
        return (this.state.collapsed) ? 'chevron-right' : 'chevron-down';
    }

    get projectName() {
        const {title} = this.props;
        return (title.length > this.limitText) ? `${title.slice(0, this.limitText)}...` : title;
    }
    
    componentWillMount() {
        const { content: { files, folders } } = this.props;
        this.setState({ files, folders });
    }
    
    componentWillReceiveProps({ content: { files, folders } }) {
        this.setState({ files, folders });
    }

    collapseAll() {
        const collapsed = true;
        this.setState({ collapsed }, () => this.setState({ collapsed: !collapsed }));
    }

    createNewElement = (path, type = 'newfile') => {
        const element = (this.props.path === path) ? this : this.childFolders[path];
        element.createElement(type);
    }
    
    createElement(type) {
        const { path } = this.props;
        const { files } = this.state;
        files.push({ type, path });
        this.setState({ files });
    }

    renderFile = (item) => (
        <ItemFile
            {...item}
            key={`${item.path}-${Math.random()}`}
            onClick={this.props.onClickNode} 
        />
    );

    onRenderChild = (childPath, obj) => {
        this.childFolders[childPath] = obj;
    }
        
    renderFolder = (item) => (
        <ItemFolder
            {...item}
            key={`${item.path}-${Math.random()}`}
            onClick={this.props.onClickNode}
            onRenderChild={this.onRenderChild}
            ref={ref => this.onRenderChild(item.path, ref)}
        />
    );

    renderFileTree(visible) {
        const { files, folders } = this.state;
        return (
            <div className={`rootContent subnodes no-padding ${visible && 'visible'}`}>
                {[].concat(folders.map(this.renderFolder)).concat(files.map(this.renderFile))}
            </div>
        );
    }

    render() {
        return (
            <div className="FileTree">
                <div className="rootTitle title">
                    <div className="left column" onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
                        <Icon name={this.iconName} className="icon" />
                        {this.projectName}
                    </div>
                    <div className="right column">
                        <Icon name="new-file" className="icon" onClick={() => Action.triggerNewFile()} />
                        <Icon name="new-folder" className="icon" onClick={() => Action.triggerNewDirectory()} />
                        <Icon name="refresh" className="icon" onClick={() => Action.readProjectFiles()} />
                        <Icon name="collapse" className="icon" onClick={() => this.collapseAll()} />
                    </div>
                </div>
                {this.renderFileTree(!this.state.collapsed)}
            </div>
        );
    }
}
