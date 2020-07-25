import React from 'react';
import { Tag, Input, Select, Table, Button, Popconfirm, Modal, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons'

const { Search } = Input;
const { Option } = Select;
import './index.scss';
import Api from '@/utils/api';


class CommentMange extends React.Component {
    constructor() {
        super();
        this.state = {
            data: '',
            intotalPage: 0,
            confirmLoading: false,
            visible: false,
            key: '',
            columns: [
                { title: 'Uuid', dataIndex: 'id', align: 'center' },
                { title: '昵称', dataIndex: 'nickName', align: 'center' },
                { title: '账号', dataIndex: 'userName', align: 'center' },
                { title: '用户评论', dataIndex: 'content', align: 'center' },
                { title: '评论时间', dataIndex: 'leavetime', align: 'center' },
                { title: '被评论店铺', dataIndex: 'shopName', align: 'center' },
                { title: '被评论商品', dataIndex: 'alias', align: 'center' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    fixed: 'right',
                    align: 'center',
                    render: (_, record) => {
                        return (
                            <>
                                {/* <Button type="primary" size="default" style={{ marginRight: '20px' }} onClick={this.handleOperation.bind(null,record.key)}>审核</Button> */}
                                <Popconfirm title="此操作不可逆，是否删除?" cancelText="取消" okText="确定" onConfirm={() => this.handleDelete(record.key)}>
                                    <Button type="primary" size="default" danger>删除</Button>
                                </Popconfirm>
                            </>
                        )
                    }
                }
            ]
        }
        this.handleOperation = this.handleOperation.bind(this);
    }

    componentDidMount() {
        Api.getComment({ page: 1, size: 10 }).then(res => {
            // console.log(res.data)
            let newData = []

            if (res.data.flag) {
                res.data.data.forEach(item => {
                    newData.push({
                        key: item.id,
                        id: item.id,
                        nickName: item.nickName,
                        userName: item.userName,
                        content: item.context,
                        leavetime: item.leave,
                        shopName: item.shopName,
                        alias: item.alias
                    });
                });

                this.setState({
                    data: newData,
                    intotalPage: res.data.total
                })
            }
        })
    }

    handleOperation = (key) => {
        this.setState({
            visible: true,
        });
    }

    handleDelete = (key) => {
        let newData = this.state.data.filter(item => {
            return item.key === key;
        })
        Api.delComment({ id: newData[0].id }).then(res => {
            if (res.data.flag) {
                message.success('删除数据成功');
                //
                newData = this.state.data.filter(item =>{
                    return item.key !== key;
                })
                this.setState({data:newData,intotalPage:newData.length});
            } else {
                message.error('删除数据失败');
            }
        }).catch(err => {
            message.error('未知错误删除失败')
        })
    }

    //
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });


        setTimeout(() => {
            message.success('审核通过');
            this.setState({
                visible: false,
                confirmLoading: false,
                // data: temp
            });
        }, 2000);
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    pageCode = (page, size) => {
        //ajax todo
        Api.getComment({ page: page, size: size }).then(res => {
            // console.log(res.data)
            let newData = []

            if (res.data.flag) {
                res.data.data.forEach(item => {
                    newData.push({
                        key: item.id,
                        id: item.id,
                        nickName: item.nickName,
                        userName: item.userName,
                        content: item.context,
                        leavetime: item.leave,
                        shopName: item.shopName,
                        alias: item.alias
                    });
                });

                this.setState({
                    data: newData,
                    intotalPage: res.data.total
                })
            }
        })
    }

    render() {
        return (
            <>
                <div style={{ margin: '5px 0 10px' }}>
                    <Tag color="#1890FF" icon={<HomeOutlined />}>当前位置&nbsp;&gt;&nbsp;/评论管理/评论列表</Tag>
                    <Search
                        placeholder="input search text"
                        enterButton="查询"
                        size="middle"
                        onSearch={value => console.log(value)}
                        style={{ maxWidth: '300px', float: 'right' }}
                    />
                </div>
                <Table
                    // 分页位置
                    pagination={{ position: ['bottomCenter'], onChange: this.pageCode, total: this.state.intotalPage }}
                    // 标题列渲染
                    // columns={columns} 
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    // 表格布局
                    tableLayout="auto"
                    //页脚内容
                    footer={() => ''}
                    // 滑动条配置 scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                    scroll={{ x: 'calc(700px + 50%)' }}
                />
                <div>
                    <Modal
                        title="编辑"
                        cancelText="审核不通过"
                        okText="审核通过"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                        maskClosable={false}
                    >

                    </Modal>
                </div>
            </>
        )
    }
}

export default CommentMange;