import React from 'react';
import Icon from '../icon';
import './styles.css';

const TOOL_EXPLORER = 'explorer';

export default class ActivityBar extends React.Component {

    state = { active: null };

    componentDidMount() {
        this.selectOption(TOOL_EXPLORER);
    }

    selectOption(id) {
        this.props.onToolSelect(id);
        this.setState({ active: id });
    }

    isActive = (id) => (this.state.active === id) ? 'active' : '';

    render() {
        return (
            <div className="Toolbar">
                <div className="top">
                    <Icon
                        name="explorer"
                        className={`icon ${this.isActive(TOOL_EXPLORER)}`}
                        onClick={() => this.selectOption(TOOL_EXPLORER)}
                    />
                </div>
                <div className="bottom" />
            </div>
        );
    }
}