import React from "react";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            error: false,
            index: 0,
            login: '',
            password: '',
            prevUser: '',
            users: this.props.users
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(e) {
        if (e.target.id === 'username') {
            this.setState({login: e.target.value})
        } else if (e.target.id === 'password') {
            this.setState({password: e.target.value})
        }
    }

    login(e) {
        this.state.users.map((value, index) => {
            if (value.login === this.state.login && value.password === this.state.password) {
                this.props.setUser(value.username, value.icon, value.color);
                this.props.setUserIndex(index);
                this.props.setActiveUser(true, index);
                this.setState({currentUser: value, error: false, login: "", password: "", prevUser: this.state.login},
                    function () {
                        this.setState({index: index})
                    });
            } else {
                this.setState({error: true})
            }
        });
        e.preventDefault();
    }

    logout(e) {
        this.props.setActiveUser(false, this.state.index);
        this.props.setUser(null);
        e.preventDefault();
    }

    render() {
        if (this.props.status) {
            return (
                <ul>
                    <li>{this.state.currentUser.username}</li>
                    <li><a href="#logout" onClick={this.logout}>Log out</a></li>
                </ul>
            );
        }

        return (
            <form id="login" onSubmit={this.login}>
                <h3>Welcome back!</h3>
                <label htmlFor="username">Username </label>
                <input id="username" type="text" value={this.state.login}
                       onChange={this.handleChange}/>
                <label htmlFor="password">Password </label>
                <input id="password" type="password" value={this.state.password}
                       onChange={this.handleChange}/>
                <p className={this.state.error ? "error" : "hidden"}>Wrong username or password</p>
                <button type="submit">Login</button>
                <p>
                    <small>Psst... Try <kbd>admin:admin</kbd> or <kbd>user:user</kbd>.</small>
                </p>
            </form>
        )
    }
}
