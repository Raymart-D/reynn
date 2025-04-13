// filepath: /workspaces/reynn/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
            </Switch>
        </Router>
    );
};

export default App;