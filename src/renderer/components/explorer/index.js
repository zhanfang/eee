import React from 'react';
import { inject, observer } from 'mobx-react';
import FileTree from '../fileTree';
import './styles.css';
import * as Action from '../../common/actions';
import {logger} from '../../common/utils';

@inject('project')
@observer
export default class Explorer extends React.Component {

    // 此处获取读取文件目录路径，并获取project相关信息
    componentWillMount() {
        logger(__dirname);
    }

    onClickNode(node) {
        if (node.type) Action.loadFile(node);
    }

    renderFileTree() {
        const { project } = this.props;
        if (project.loading || !project.name) return null;
        return (
            <FileTree
                path={project.path}
                title={project.name}
                content={project.content}
                ref={Action.setFileTreeHandler}
                onClickNode={(node) => this.onClickNode(node)}
            />
        );

    }

    render() {
        return (
            <div className="Explorer">
                <div className="title">
                    <span>Explorer</span>
                </div>
                {this.renderFileTree()}
            </div>
        );
    }
}