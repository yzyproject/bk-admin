import React from 'react';
import { Form,Icon, Input, Button,message, Upload, Modal} from 'antd';
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
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => {
        this.props.setFile({ fileList })
        this.setState({ fileList })
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
