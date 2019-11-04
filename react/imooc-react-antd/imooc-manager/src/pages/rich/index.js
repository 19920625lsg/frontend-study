import React, {Component} from 'react';
import {Card, Button, Modal} from 'antd'
// 教程见链接：https://www.npmjs.com/package/react-draft-wysiwyg
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Rich extends Component {
    state = {
        showRichText: false,
        editorState: ''
    };
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    handleClearContent = () => {
        this.setState({
            editorState: ''
        });
    };
    handleGetHtmlContent = () => {
        this.setState({
            showRichText: true
        })
    };

    onEditorChange = (contentState) => {
        this.setState({
            contentState
        });
    };

    render() {
        return (
            <div>
                <Card>
                    <Button type="danger" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="default" style={{marginLeft: 5}}
                            onClick={this.handleGetHtmlContent}>获取内容的HTML格式</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={this.state.editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal title="富文本" visible={this.state.showRichText} onCancel={() => {
                    this.setState({
                        showRichText: false
                    })
                }}
                       footer={null}
                >
                    {/*把富文本内容转换为HTML*/}
                    {draftToHtml(this.state.contentState)}
                </Modal>
            </div>
        );
    }
}

export default Rich;
