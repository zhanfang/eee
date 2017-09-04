import React from 'react';
import ActivityBar from '../activityBar';
import Explorer from '../explorer';
import './styles.css';

export default class Sidebar extends React.Component {

    state = { selectedTool: null };

    renderContext() {
        switch (this.state.selectedTool) {
            case 'explorer': return <Explorer />;
            default: return null;
        }
    }

    render() {
        return (
            <div className="Sidebar" {...this.props}>
                <ActivityBar onToolSelect={(selectedTool) => this.setState({ selectedTool })} />
                <div className="container">
                    {this.renderContext()}
                </div>
            </div>
        );
    }
}