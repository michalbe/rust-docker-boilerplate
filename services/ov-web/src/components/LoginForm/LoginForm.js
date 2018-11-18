import React from 'react';
import ReactDOM from 'react-dom';

import styles from './LoginForm.css';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            loginError: false
        };

        this.setLogin = this.setLogin.bind(this);
        this.setPassword = this.setPassword.bind(this);

        this.handleClose = this.handleClose.bind(this);
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

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ loginError: false });
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
            this.setState({
                loginError: false
            })

            if (json.status === 200) {
                this.props.logMeIn(this.state.login);
            } else {
                this.setState({
                    loginError: true
                });
            }
        });
    }

    handleClickShowPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword(event) {
        event.preventDefault();
    }

    render() {
        return <div>
            Login form
        </div>
    }
}
