/**
 * @file 文件夹目录树形结构
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'

import React from 'react'

export default class FileTree extends React.Component {
    state = {
        collapsed: false,
        files: [],
        folders: []
    }

    limitText = 20;

    get iconName() {
        return (this.state.collapsed) ? 'chevron-right' : 'chevron-down';
    }

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
            </div>
        );
    }
}
