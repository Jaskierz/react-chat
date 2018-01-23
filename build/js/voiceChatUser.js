import React from "react";

export class VoiceChatUser extends React.Component {
    render() {
        if (this.props.active === this.props.channel) {
            return (
                <div>
                    <img className="icon-small" src={this.props.icon}/>
                    <p>{this.props.username}</p>
                </div>
            )
        }
        return null;
    }
}
