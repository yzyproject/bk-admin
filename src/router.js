import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Login from './page/login';
import Registered from './page/registered';
import Index from './page/index';
import R from './page/redux'
import MenuURL from './page/menuURL'

export default class router  extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={ Login } />
                    <Route  path="/registered" component={ Registered } />
                    <Route  path="/mk-editor" component={ MenuURL.mkEditor } />
                    <Route  path="/redux" component={ R } />
                    <Route  path="/index" component={ Index } />
                </div>
            </Router>
        );
    }
}
