import React from 'react';
import { Tag, Input, Select, Table, Button, Popconfirm, Modal, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons'

const { Search } = Input;
const { Option } = Select;
import './index.scss';
import Api from '@/utils/api';

class StoreMange extends React.Component {
    constructor() {
        super();
        this.state = {
            data: '',
            intotalPage: 0,
            confirmLoading: false,
            visible: false,
            columns: [
                { title: 'Uuid', dataIndex: 'id', align: 'center' },
                { title: '账号', dataIndex: 'userName', align: 'center' },
                { title: '密码', dataIndex: 'passWord', align: 'center' },
                { title: '商铺名称', dataIndex: 'shopName', align: 'center' },
                { title: '地址', dataIndex: 'area', align: 'center' },
                { title: '详细地址', dataIndex: 'site', align: 'center' },
                { title: '联系人', dataIndex: 'linkman', align: 'center' },
                { title: '手机号码', dataIndex: 'phone', align: 'center' },
                { title: '邮箱地址', dataIndex: 'email', align: 'center' },
                { title: '身份证', dataIndex: 'idCard', align: 'center' },
                { title: '审核状态', dataIndex: 'auditState', align: 'center' },
                { title: '创建时间', dataIndex: 'regTime', align: 'center' },
                { title: '当前状态', dataIndex: 'curState', align: 'center' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    fixed: 'right',
                    align: 'center',
                    render: (_, record) => {
                        return (
                            <>
                                <Button type="primary" size="default" style={{ marginRight: '20px' }} onClick={this.handleOperation.bind(null, record.key)}>审核</Button>
                                <Popconfirm title="此操作不可逆，是否删除?" cancelText="取消" okText="确定" onConfirm={() => this.handleDelete(record.key)}>
                                    <Button type="primary" size="default" danger>删除</Button>
                                </Popconfirm>
                            </>
                        )
                    }
                }
            ],
            key: ''
        }
        this.handleOperation = this.handleOperation.bind(this);
    }

    componentDidMount() {
        Api.getStoreInfo({ page: 1, size: 10 }).then(res => {
            let data = res.data;
            if (!data.flag) {
                return;
            }

            let newData = [];
            data.data.forEach((item) => {
                newData.push({
                    key: item.id,
                    id: item.id,
                    userName: item.userName,
                    passWord: item.password,
                    shopName: item.shopName,
                    area: item.area,
                    site: item.site,
                    linkman: item.linkman,
                    phone: item.phone,
                    email: item.email,
                    idCard: item.idCard,
                    auditState: item.audit,
                    regTime: item.regtiem,
                    curState: item.shopState,
                })
            })
            //
            this.setState({
                data: newData,
                intotalPage: res.data.total
            })
        }).catch(err => {
            message.error('获取数据是出错');
        })
    }

    handleOperation = (key) => {
        this.setState({
            visible: true,
        });
        this.setState({
            key: key
        })
    }

    handleDelete = (key) => {
        message.success('当前不支持删除');
    }

    //
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });

        let newData = this.state.data.filter(item=>{
            return item.key === this.state.key;
        })
        //用户转商铺审核
        Api.auditStore({id:newData[0].id,audit:'通过'}).then(res=>{
            if(res.data.flag){
                message.success('审核通过');
            }else{
                throw '审核不通过';
            }
        }).catch(err=>{
            message.success(err);
        })
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                // data: temp
            });
        }, 2000);
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });

        let newData = this.state.data.filter(item=>{
            return item.key === this.state.key;
        })

        if(e.target.innerHTML === '审核不通过'){
            Api.auditStore({id:newData[0].id,audit:'不通过'}).then(res=>{
                if(res.data.flag){
                    message.success('该商铺审核不通过');
                }else{
                    throw '审核出错';
                }
            }).catch(err=>{
                message.success(err);
            })
        }else{
            return;
        }
    }

    pageCode = (page, size) => {
        //ajax todo
        Api.getStoreInfo({ page: page, size: size }).then(res => {
            let data = res.data;
            if (!data.flag) {
                return;
            }

            let newData = [];
            data.data.forEach((item) => {
                newData.push({
                    key: item.id,
                    id: item.id,
                    userName: item.userName,
                    passWord: item.password,
                    shopName: item.shopName,
                    area: item.area,
                    site: item.site,
                    linkman: item.linkman,
                    phone: item.phone,
                    email: item.email,
                    idCard: item.idCard,
                    auditState: item.audit,
                    regTime: item.regtiem,
                    curState: item.shopState,
                })
            })
            //
            this.setState({
                data: newData,
                intotalPage: res.data.total
            })
        }).catch(err => {
            message.error('获取数据是出错');
        })
    }

    render() {
        return (
            <>
                <div style={{ margin: '5px 0 10px' }}>
                    <Tag color="#1890FF" icon={<HomeOutlined />}>当前位置&nbsp;&gt;&nbsp;/商铺管理/商铺列表</Tag>
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
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    // 表格布局
                    tableLayout="auto"
                    //页脚内容
                    footer={() => ''}
                    // 滑动条配置 scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                    scroll={{ x: 'calc(700px + 100%)' }}
                />
                <div>
                    <Modal
                        title="审核单"
                        cancelText="审核不通过"
                        okText="审核通过"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                        maskClosable={false}
                    >
                        <textarea className="edit-textarea" placeholder="审核留言">

                        </textarea>
                    </Modal>
                </div>
            </>
        )
    }
}

export default StoreMange;