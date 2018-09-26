import React from 'react';
import { Form,Icon, Input, Button,message, Upload, Modal} from 'antd';
import Fetch from '../../common/fetch'; 
import Config from '../../config';
require("es6-promise").polyfill();
require("isomorphic-fetch");
export default class upLoad  extends React.Component{
    constructor(obj){
        super(obj)
        this.state = {
            boll:true,
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }
   
    
    handleChange = info =>  {
        let setFiles = this.props.setFiles
        let boll = this.state.boll;
        this.setState({fileList:info.fileList})
        let f = new Fetch();
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
          }
          if (info.file.status === 'done') {
              let files = info.fileList.map(f=>({filename:f.response.filename}))
            setFiles(files)
          }
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
                        action= {`${Config.host}/index/file`}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
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
