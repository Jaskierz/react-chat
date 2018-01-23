import React from "react";
import {VoiceChatConnected} from "./voiceChatConnected.js"

export class UserPanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.setActiveUser(false, this.props.index);
        this.props.setCurrentVoiceChannel(null);
        this.props.setUser(null);
        e.preventDefault()
    }

    render() {
        return (
            <div className="panel">
                <VoiceChatConnected activeChannel={this.props.activeChannel}
                                    setChannel={this.props.setCurrentVoiceChannel}/>
                <div className="user-panel">
                    <div className="user">
                        <img className="icon-small" src={this.props.user.icon}/>
                        <p>{this.props.user.username}</p>
                    </div>
                    <a className="logout" onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}
