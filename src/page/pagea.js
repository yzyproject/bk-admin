import React from 'react';
import {NavLink,BrowserRouter} from 'react-router-dom';
import Fetch from '../common/fetch'; 
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
require("es6-promise").polyfill();
require("isomorphic-fetch");
class Login extends React.Component{
    constructor(obj){
        super(obj)
        this.state = {
        }
    }
    render(){
        return(
            <span style = {{marginTop:"100px",display:"block"}}>
               pagea
            </span>
        );
    }
}
export default Form.create()(Login);
