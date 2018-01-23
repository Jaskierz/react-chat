import React from "react";
import {AddChannel} from "./addChannel.js";
import {VoiceChatUser} from "./voiceChatUser.js";

export class VoiceChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            voiceChannels: this.props.voiceChannels
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setVoiceChannels = this.setVoiceChannels.bind(this);
    }

    setVoiceChannels(channel) {
        this.setState({voiceChannels: channel});
    }

    componentWillMount() {
        if (Object.keys(this.state.voiceChannels).length === 0) {
            this.setState({
                voiceChannels: [{id: 'general', name: 'General'}, {id: 'daily', name: 'Daily'}]
            });
        }
    }

    componentWillUnmount() {
        this.props.setVoiceChannels(this.state.voiceChannels);
    }

    handleUserInput(e) {
        this.setState({userInput: e.target.value});
    }

    handleClick(e) {
        this.props.setCurrentVoiceChannel(e.target.id);
    }

    onSubmit(e) {
        let id = (this.state.userInput).replace(/\s/g, '_');
        let found = this.state.voiceChannels.some((element) => {
            return element.id === id;
        });
        if (this.state.userInput !== "" && found !== true) {
            let arr = this.state.voiceChannels;
            this.setState({
                voiceChannels: arr.concat([{
                    id: id,
                    name: id
                }])
            });
        }
        this.setState({add: false});
        this.setState({userInput: ""});
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="channel-name">
                    <h4>Voice Chats</h4>
                    <AddChannel channelType={this.state.voiceChannels} setChannels={this.setVoiceChannels}
                                type="voice"/>
                </div>
                {this.state.voiceChannels.map((channel) =>
                    <div key={channel.id} className="voice-channel">
                        <h5 id={channel.id} onClick={this.handleClick}>
                            <i className="image"/>
                            {channel.name}</h5>
                        <VoiceChatUser icon={this.props.user.icon} username={this.props.user.username}
                                       active={this.props.activeChannel}
                                       channel={channel.id}/>
                    </div>
                )}
            </div>
        )
    }
}
