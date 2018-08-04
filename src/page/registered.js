import React from 'react';
import {Link} from 'react-router-dom';
import Fetch from '../common/fetch'; 
import { Form, Icon, Input, Button,message } from 'antd';
import Uploads from './component/upload'; 
import 'antd/dist/antd.css';
const FormItem = Form.Item;
require("es6-promise").polyfill();
require("isomorphic-fetch");
class Login extends React.Component{
    constructor(obj){
        super(obj)
        this.state = {
            filter:{},
            limit:2,
            page:1,
            files:[],
            sort:{type:1}
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.addUser(values)
          }
        });
    }

    setFiles(files){
        this.setState({files:files})
        console.log("this.state.files:",this.state.files)
    }
    
    //添加数据
    async addUser(values){
        let f = new Fetch();
        let item = values;
        item.files = this.state.files;
        let res = await f.fetch('http://localhost:3001/addOne',{
            item:item
        })
        if(res && res.status === "success"){
           message.success("添加数据")
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 8 },
        };
        
        return(
            <span style = {{marginTop:"100px",display:"block"}}>
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
                        label="手机号码："
                    >
                        {getFieldDecorator('phone', {
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="手机号" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职业"
                    >
                        {getFieldDecorator('work', {
                            
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="职业" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="爱好"
                    >
                        {getFieldDecorator('love', {
                            
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="爱好" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        style = {{textAlign:"right"}}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                           注册
                        </Button>
                    </FormItem>
                </Form>
            </span>
        );
    }
}

export default Form.create()(Login);
