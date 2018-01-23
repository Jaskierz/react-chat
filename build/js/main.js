import React from "react";
import ReactDOM from "react-dom";
import {ActiveUsers} from "./activeUsers.js";
import {Chat} from "./chat.js";
import {Login} from "./login.js";
import {UserPanel} from "./userPanel.js";
import {TextChat} from "./textChat.js";
import {userList} from "./userList.js";
import {VoiceChat} from "./voiceChat.js";

class MainChat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentChannel: "general",
            messages: {},
            textChannels: {},
            voiceChannels: {},
            activeVoiceChannel: null,
            users: userList,
            userIndex: null,
            //set user to null
            currentUser: null
        };

        this.setActiveUser = this.setActiveUser.bind(this);
        this.setMessages = this.setMessages.bind(this);
        this.setCurrentChannel = this.setCurrentChannel.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.setCurrentVoiceChannel = this.setCurrentVoiceChannel.bind(this);
        this.setTextChannels = this.setTextChannels.bind(this);
        this.setVoiceChannels = this.setVoiceChannels.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setUserIndex = this.setUserIndex.bind(this);
    }

    setActiveUser(state, index) {
        let usersCopy = this.state.users;
        usersCopy[index].active = state;
        this.setState({
            users: usersCopy
        });
    }

    setMessages(messages) {
        this.setState({messages: messages});
    }

    setCurrentChannel(channel) {
        this.setState({currentChannel: channel});
    }

    setTextChannels(textChannels) {
        this.setState({textChannels: textChannels});
    }

    setVoiceChannels(voiceChannels) {
        this.setState({voiceChannels: voiceChannels});
    }

    setUser(user) {
        this.setState({currentUser: user})
    }

    setUserIndex(index) {
        this.setState({userIndex: index})
    }

    setCurrentUser(username, icon, color) {
        this.setState({
            currentUser: {
                username: username, icon: icon, color: color
            }
        });
    }

    setCurrentVoiceChannel(channel) {
        this.setState({activeVoiceChannel: channel});
    }

    render() {
        if (!this.state.currentUser) {
            return (
                <Login setActiveUser={this.setActiveUser} setUser={this.setCurrentUser}
                       setUserIndex={this.setUserIndex} status={this.state.status} users={this.state.users}/>
            )
        }

        return (
            <div>
                <div className="chat-channels">
                    <TextChat setCurrentChannel={this.setCurrentChannel}
                              textChannels={this.state.textChannels} setTextChannels={this.setTextChannels}/>
                    <VoiceChat user={this.state.currentUser} voiceChannels={this.state.voiceChannels}
                               activeChannel={this.state.activeVoiceChannel}
                               setVoiceChannels={this.setVoiceChannels}
                               setCurrentVoiceChannel={this.setCurrentVoiceChannel}/>
                    <UserPanel setActiveUser={this.setActiveUser} setUser={this.setUser} index={this.state.userIndex}
                               user={this.state.currentUser} setCurrentVoiceChannel={this.setCurrentVoiceChannel}
                               activeChannel={this.state.activeVoiceChannel}/>
                </div>
                <Chat user={this.state.currentUser} currentChannel={this.state.currentChannel}
                      setMessages={this.setMessages} messages={this.state.messages}/>
                <ActiveUsers users={this.state.users}/>
            </div>

        )
    }
}

ReactDOM.render(<MainChat/>, document.getElementById("app"));
