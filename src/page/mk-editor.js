import React from 'react';
import { Form,Icon, Input, Button,message, Upload, Modal} from 'antd';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Fetch from '../common/fetch'; 
import Uploads from './component/upload'; 
const ReactMarkdown = require('react-markdown');
const { TextArea } = Input;
const input = '# This is a header\n\nAnd this is a paragraph';
const FormItem = Form.Item;
require("es6-promise").polyfill();
require("isomorphic-fetch");
class Editor extends React.Component{
    constructor(obj){
        super(obj)
        this.state = {
            boll:true,
            filter:{},
            limit:2,
            page:1,
            sort:{type:1},
            code:"",
            value:'<p>在此输入内容</p>',
            files:[]
        }
    }
    
    //添加数据
    async addBowen(){
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
        let res = await f.fetch('http://localhost:3001/addOne',{
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

    handleChange(content){
        this.setState({
            content: content
        })
    }

   
    
    componentDidMount(){
        
    }

    

    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.addBowen(values)
          }
        });
    }

    async addBowen(values){
        let boll = this.state.boll;
        let f = new Fetch();
        let item = {};
        item = Object.assign(item,values)
        item.content = this.state.value
        let res = await f.fetch('http://localhost:3001/editor/addBowen',{
            item:item
        },boll)
        this.setState({
            boll:false
        })
        if(res && res.status === "success"){
            message.success("添加成功！")
            this.setState({
                boll:true
            })
        }
        console.log("item:",item)
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
    Files(files){
        this.setState({files})
        console.log("====filesstate:",this.state.files)
    }

    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };
        return(
            <span style = {{display:"block"}}>
                {
                    /*
                      <ReactMarkdown source={input} />
                    */
                }
                <Form  onSubmit = {this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label="标题"
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input your title!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="title" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="作者"
                    >
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: 'Please input your title!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="author" />
                        )}
                    </FormItem>

                    <FormItem
                       
                        label="内容"
                    >
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input your contents!' }],
                        })(
                            <TextArea  autosize={{ minRows: 13, maxRows: 13 }} />
                        )}
                    </FormItem>

                    <Uploads setFile = {(files)=>{this.Files(files)}} />
                   
                    <FormItem
                        {...formItemLayout}
                        style = {{textAlign:"right",float:"right",marginTop:"15px"}}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                           提交
                        </Button>
                    </FormItem>
                </Form>
            </span>
        );
    }
}
export default Form.create()(Editor);
const styles = {
    height:"300px"
}