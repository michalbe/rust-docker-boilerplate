import React from 'react';

import { LoginPage } from '../LoginPage/LoginPage';
import { DashboardPage } from '../DashboardPage/DashboardPage';

export class MainPage extends React.Component {
    render() {
        return <div>
            { 
                this.props.isLogged 
                    ? <DashboardPage></DashboardPage>
                    : <LoginPage logMeIn={ this.props.logMeIn }></LoginPage>
            }
        </div>
    }
}
