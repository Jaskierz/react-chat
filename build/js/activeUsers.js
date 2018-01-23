import React from "react"


export class ActiveUsers extends React.Component {
    render() {
        return (
            <div className="active-users">
                <h4>Online</h4>
                {this.props.users.map((user) =>
                    <div key={user.login}>
                        {user.active &&
                        <li>
                            <div>
                                <img className="icon-big" src={user.icon}/>
                                <h5 style={{color: user.color}}>{user.username}</h5>
                            </div>

                        </li>
                        }
                    </div>
                )}
                <h4>Offline</h4>
                <ul>
                    {this.props.users.map((user) =>
                        <div key={user.login}>
                            {!user.active &&
                            <li>
                                <div>
                                    <img className="icon-big" src={user.icon}/>
                                    <h5 style={{color: user.color}}>{user.username}</h5>
                                </div>

                            </li>
                            }
                        </div>
                    )}
                </ul>
            </div>
        )
    }
}
