import React from 'react';

export class VoiceChatConnected extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        this.props.setChannel(null);
        e.preventDefault()
    }

    render() {
        if (this.props.activeChannel) {
            return (
                <div className="connected">
                    <div>
                        <p>Connected to voice chat</p>
                        <p>
                            <small>{this.props.activeChannel}</small>
                        </p>
                    </div>
                    <a className="disconnect" onClick={this.handleClick}/>
                </div>
            )
        }
        return null;
    }
}
