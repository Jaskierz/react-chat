import React from 'react';

export class AddChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,
            userInput: "",
            channels: this.props.channelType,
            elementId: null
        };

        this.cancel = this.cancel.bind(this);
        this.addChannel = this.addChannel.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    addChannel() {
        this.setState({add: true});
    }

    cancel() {
        this.setState({add: false});
    }

    handleClickOutside(e) {
        if (e.target.className === 'modal') {
            this.setState({add: false});
        }
    }


    componentWillUnmount() {
        this.props.setChannels(this.state.channels);
    }

    handleUserInput(e) {
        this.setState({userInput: e.target.value});
    }

    onSubmit(e) {
        let id = (this.state.userInput).replace(/\s/g, '_');
        let found = this.state.channels.some((element) => {
            return element.id === id;
        });
        if (this.state.userInput !== "" && found !== true) {
            let arr = this.state.channels;
            this.setState({
                channels: arr.concat([{
                    id: id,
                    name: id
                }])
            }, function () {
                this.props.setChannels(this.state.channels);
            });
        }
        this.setState({add: false});
        this.setState({userInput: ""});
        e.preventDefault();
    }


    render() {
        if (!this.state.add) {
            return (
                <a className="add-channel-button" onClick={this.addChannel}/>
            )
        }

        return (
            <div>
                <form className="modal" onSubmit={this.onSubmit} onClick={this.handleClickOutside}>
                    <div className="modal-content">
                        <h4>Create {this.props.type} channel</h4>
                        <input type="text" value={this.state.userInput} onChange={this.handleUserInput}
                               placeholder="Enter channel name"/>

                        <div className="buttons">
                            <a className="button" href="#" onClick={this.onSubmit}>Create</a>
                            <a href="#" onClick={this.cancel}>Cancel</a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
