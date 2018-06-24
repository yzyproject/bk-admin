import React from 'react';
import { Form,Icon, Input, Button,message, Upload, Modal} from 'antd';
import Fetch from '../../common/fetch'; 
require("es6-promise").polyfill();
require("isomorphic-fetch");
export default class upLoad  extends React.Component{
    constructor(obj){
        super(obj)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
        this.update()
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }
    async update(){
        let boll = this.state.boll;
        let f = new Fetch();
        let res = await f.fetch('http://localhost:3001/editor/file',{
            files:"fileList"
        },boll)
        this.setState({
            boll:false
        })
        if(res && res.status === "success"){
            message.success("请求成功！")
            this.setState({
                boll:true
            })
        }
    }
    async handleChange (info) {
        
        
        
    }

    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        return(
            <span style = {{display:"block"}}>
                <div className="clearfix">
                    <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={(info)=>this.handleChange(info)}
                    >
                    {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            </span>
        );
    }
}
const styles = {
    height:"300px"
}
