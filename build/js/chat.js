import React from "react";

const d = new Date();
const h = ("0" + d.getHours()).slice(-2);
const m = ("0" + d.getMinutes()).slice(-2);


export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            messages: this.props.messages,
            time: `${h}:${m}`
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom();
        window.setInterval(function () {
            this.setTime();
        }.bind(this), 1000);
    }


    componentWillMount() {
        if (Object.keys(this.state.messages).length === 0) {
            this.setState({
                messages: Object.assign({}, this.state.messages, {
                    [this.props.currentChannel]: [{
                        id: 0,
                        name: 'Server',
                        color: this.props.user.color,
                        icon: this.props.user.icon,
                        time: this.state.time,
                        value: `Welcome to #${this.props.currentChannel}`,
                    }]
                }),
            });
        }
    }

    componentWillUnmount() {
        this.props.setMessages(this.state.messages);
    }

    componentWillReceiveProps(nextProps) {
        if (typeof this.state.messages[nextProps.currentChannel] === 'undefined')
            this.setState({
                messages: Object.assign({}, this.state.messages, {
                    [nextProps.currentChannel]: [{
                        id: 0,
                        name: 'Server',
                        color: this.props.user.color,
                        icon: this.props.user.icon,
                        time: this.state.time,
                        value: `Welcome to #${nextProps.currentChannel}`
                    }]
                })
            });
    }

    handleUserInput(e) {
        this.setState({userInput: e.target.value});
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView();
    }

    setTime() {
        const d = new Date();
        const h = ("0" + d.getHours()).slice(-2);
        const m = ("0" + d.getMinutes()).slice(-2);
        this.setState({time: `${h}:${m}`})
    }

    onSubmit(e) {
        if (this.state.userInput !== "") {
            let arr = this.state.messages[this.props.currentChannel];
            let id = arr[arr.length - 1].id + 1;
            this.setState({
                messages: Object.assign({}, this.state.messages, {
                    [this.props.currentChannel]: arr.concat([{
                        id: id,
                        color: this.props.user.color,
                        icon: this.props.user.icon,
                        name: this.props.user.username,
                        time: this.state.time,
                        value: this.state.userInput
                    }])
                })
            }, this.scrollToBottom);
            this.setState({userInput: ""});
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className="channel">
                <h4>#{this.props.currentChannel}</h4>
                <ul className="messages">
                    {this.state.messages[this.props.currentChannel].map((text, key) =>
                        <li key={key} id={text.id}>
                            <div>
                                <img className="icon-big" src={text.icon}/>
                                <div id="message">
                                    <p style={{color: text.color}}>{text.name} <span>today at {text.time}</span></p>
                                    <p>{text.value}</p>
                                </div>
                            </div>
                        </li>)}
                    <p ref={(el) => {
                        this.messagesEnd = el;
                    }}/>
                </ul>

                <div className="foot">
                    <form id="messages" className="input" onSubmit={this.onSubmit}>
                        <input type="text" value={this.state.userInput} onChange={this.handleUserInput}
                               placeholder={`Type on #${this.props.currentChannel}`}/>
                        <div className="button-img">
                            <button type="button" onClick={this.onSubmit}/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
