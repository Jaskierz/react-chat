import React from "react";
import {AddChannel} from "./addChannel.js";

export class TextChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            textChannels: this.props.textChannels
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.setTextChannels = this.setTextChannels.bind(this);
    }

    setTextChannels(channel) {
        this.setState({textChannels: channel});
    }

    componentWillMount() {
        if (Object.keys(this.state.textChannels).length === 0) {
            this.setState({
                textChannels: [{id: 'general', name: 'general'}, {id: 'other', name: 'other'}]
            });
        }
    }

    componentWillUnmount() {
        this.props.setTextChannels(this.state.textChannels);
    }

    handleUserInput(e) {
        this.setState({userInput: e.target.value});
    }

    handleClick(e) {
        this.props.setCurrentChannel(e.target.id);
    }

    render() {
        return (
            <div>
                <div className="channel-name">
                    <h4>Text Chats</h4>
                    <AddChannel channelType={this.state.textChannels} setChannels={this.setTextChannels} type="text"/>
                </div>
                <div className="text-channel">
                    {this.state.textChannels.map((text) =>
                        <h5 key={text.id} id={text.id} onClick={this.handleClick}><i>#</i> {text.name}</h5>)}
                </div>
            </div>
        )
    }
}
