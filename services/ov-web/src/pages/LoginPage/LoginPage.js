import React from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import styles from './LoginPage.css';


export class LoginPage extends React.Component {
    render() {
        return <div>
            <h1 className={ styles.header }>Hello</h1>
            <LoginForm logMeIn={this.props.logMeIn }></LoginForm>
        </div>
    }
}
