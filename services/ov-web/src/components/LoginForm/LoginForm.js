import React from 'react';
import ReactDOM from 'react-dom';

import styles from './LoginForm.css';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        };

        this.setLogin = this.setLogin.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.performLoginAction = this.performLoginAction.bind(this);
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    setLogin(e) {
        this.setState({
            login: e.target.value
        });
    }

    performLoginAction() {
        const formData = new FormData();
        formData.append('username', this.state.login);
        formData.append('password', this.state.password);

        fetch('/api/login', {
            credentials: "same-origin",
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: `username=${this.state.login}&password=${this.state.password}`
        })
        .then((resp) => {
            return resp.json();
        })
        .then((json) => {

            if (json.status === 200) {
                this.props.logMeIn(this.state.login);
            } else {
                alert('wrong password or login');
            }
        });
    }

    render() {
        return <div>
            <div className={ styles.login_container }>
                Login
                <input type="text" className={styles.form_field} onChange={this.setLogin} />
                <input type="password" className={styles.form_field} onChange={this.setPassword} />
                <button onClick={this.performLoginAction}>Login</button>
            </div>
        </div>
    }
}
