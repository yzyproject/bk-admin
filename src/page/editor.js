import React from 'react';
import { Form,Icon, Input, Button } from 'antd';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import Fetch from '../common/fetch'; 
// const ReactMarkdown = require('react-markdown');
// const input = '# This is a header\n\nAnd this is a paragraph'
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
            value:'<p>在此输入内容</p>'
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

    // handleChange(content){
    //     this.setState({
    //         content: content
    //     })
    // }

    handleChange () {  
        let {value}=this.state;  
        value = this.editor.root.innerHTML;  
        this.setState({value});  
        console.log("html:",this.state.value)
    }
    
    componentDidMount(){
        const toolbarOptions = [  
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons  
            ['blockquote', 'code-block'],  
  
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values  
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],  
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript  
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent  
            [{ 'direction': 'rtl' }],                         // text direction  
  
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown  
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  
  
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme  
            [{ 'font': [] }],  
            [{ 'align': [] }],  
            ['link', 'image', 'video'],  
            ['clean']                                         // remove formatting button  
        ];
        const textbox = this.refs.textarea; 
        const options = {  
            debug: 'warn',  
            modules: {  
                toolbar: toolbarOptions  
            },  
            placeholder: '请输入文本...',  
            readOnly: false,  
            theme: 'snow'  
        };  
        const editor =this.editor= new Quill(textbox,options);  
        const {value}=this.state;  
        if (value) editor.clipboard.dangerouslyPasteHTML(value);  
        editor.on('text-change', this.handleChange.bind(this));  
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
            this.setState({
                boll:true
            })
        }
        console.log("item:",item)
    }

    render(){
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
                    <div style = {{height:styles.height}} ref="textarea"></div>
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
