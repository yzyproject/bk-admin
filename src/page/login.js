import React from 'react';
// import {NavLink,BrowserRouter} from 'react-router-dom';
import Fetch from '../common/fetch'; 
import { Form, Icon, Input, Button } from 'antd';
import Config from '../config';
const FormItem = Form.Item;
require("es6-promise").polyfill();
require("isomorphic-fetch");
class Login extends React.Component{
    constructor(obj){
        super(obj)
        this.state = {
            boll:true,
            filter:{},
            limit:2,
            page:1,
            sort:{type:1},
         
        }
        this.Init();
    }
    
    //添加数据
    async add(){
        let boll = this.state.boll;
        let f = new Fetch();
        let item = {
            userName : "yzy",
            password : "000000",
            role:"admin",
            token:"",
            sex:"main",
            phone:"13265408153",
            love:"rading",
            adress:"丰台"
        }
        let res = await f.fetch(`${Config.host}/addOne`,{
            item:item
        },boll)
        this.setState({
            boll:false
        })
        if(res && res.status === "success"){
            this.setState({
                boll:true
            })
        }
    }
    //登錄
    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.Init(values)
          }
        });
    }
    //初始化数据
    async Init(values){
        let user = values || {};
        if(user.userName && user.password){
            let args = {}
            args = Object.assign(user,this.state);
            args.filter = {
                $and:[
                    {userName:user.userName},
                    {password:user.password}
                ]
            }
            let f = new Fetch();
            let res = await f.fetch('http://localhost:3001/index/login',
                {
                    filter:args.filter,
                    limit:args.limit,
                    page:args.page,
                    sort:args.sort
                },true
            )
            if(res.status ==="success" && (res.data.list||[]).length > 0){
                console.log("data",res.data[0])
                localStorage.user = JSON.stringify(res.data.list[0])
                this.login();
            }
        }else{
            this.login()
        }
    }
    //登录
    login(){
        if(localStorage.user){
            let user = JSON.parse(localStorage.user); 
            if(user.role){
                this.props.history.push('/index')
            }else{
                alert("请输入正确的用户名和密码")
            }
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 8 },
        };
        
        return(
            <span className = "form_box" style = {{marginTop:"100px",display:"block",padding:"0 20px"}}>
                <Form  onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label="用户名："
                    >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码："
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        style = {{textAlign:"center"}}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                           登录
                        </Button>
                        
                    </FormItem>
                </Form>
            </span>
        );
    }
}
export default Form.create()(Login);
