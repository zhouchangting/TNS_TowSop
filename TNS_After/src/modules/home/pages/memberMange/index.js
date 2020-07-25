import React from 'react';
import { Table, Input, Button, Tag, Modal, Select, Popconfirm, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;
const { Option } = Select;

import './index.scss';
// import userAvater from '#/images/header.png';
import Api from '@/utils/api';


class MemberMange extends React.Component {
    constructor() {
        super();
        this.state = {
            data: '',
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            //表格格式初始化
            columns: [
                { title: 'Uuid', dataIndex: 'memberId', align: 'center' },
                { title: '昵称', dataIndex: 'memberNickName', align: 'center' },
                { title: '账号', dataIndex: 'memberUserName', align: 'center' },
                { title: '密码', dataIndex: 'memberPasswd', align: 'center' },
                { title: '等级', dataIndex: 'memberLevel', align: 'center' },
                { title: '号码', dataIndex: 'memberPhone', align: 'center' },
                { title: '状态', dataIndex: 'memberStatus', align: 'center' },
                {
                    title: '头像', dataIndex: 'memberAvater', align: 'center',
                    render: (value) => {
                        return (
                            value === '暂无头像' ?
                                <span>{e}</span>
                                :
                                <>
                                    <img src={value} style={{ height: '32px' }} />
                                </>
                        )
                    }
                },
                { title: '创建时间', dataIndex: 'createTime', align: 'center' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    fixed: 'right',
                    align: 'center',
                    render: (_, record) => {
                        return (
                            <>
                                <Button type="primary" size="default" style={{ marginRight: '20px' }} onClick={this.showModal.bind(null, record.key)}>编辑</Button>
                                <Popconfirm title="此操作不可逆，是否删除?" onConfirm={() => this.handleDelete(record.key)}>
                                    <Button type="primary" size="default" danger>删除</Button>
                                </Popconfirm>
                            </>
                        )
                    }
                }
            ],
            //对话框内容
            dialogData: {
                memberNickName: '',
                memberPasswd: '',
                memberLevel: '',
                memberStatus: '',
                remberAvater: ''
            },
            //总页记录
            intotalPage: 0,
        }
    }

    //请求当前页的数据
    componentDidMount() {
        Api.getUserInfo({ page: 1, size: 10, token: JSON.parse(sessionStorage.getItem('userInfo')).token }).then(res => {
            // console.log(res.data);
            const data = res.data;
            if (!data.flag) {
                return;
            }
            let newData = [];
            data.data.forEach((item, index) => {
                newData.push({
                    key: index,
                    memberId: item.id,
                    memberNickName: item.nickName,
                    memberUserName: item.userName,
                    memberPasswd: '******',
                    memberPhone: item.userPhone,
                    memberLevel: item.type ? '普通用户' : '商铺用户',
                    memberStatus: 1 ? '正常' : '禁用',
                    memberAvater: item.headPortraitUrl ? item.headPortraitUrl : '暂无头像',
                    createTime: item.regTiem
                })
            });

            //渲染数据
            this.setState({
                data: newData,
                intotalPage: data.total
            })
        }).catch(err => {
            throw err;
        })

        // this.setState({data:data});
    }

    //弹框操作
    showModal = (key) => {

        this.setState({
            visible: true,
        });
        //获取对应KEY的数据
        let result = this.state.data.filter(item => {
            return item.key === key;
        });

        this.setState({
            dialogData: result[0],
        });
    };

    //dialog save
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });

        //ajax todo
        let newData = this.state.dialogData;
        // Api.editUserInfo({
        //     userName:newData.memberUserName,
        //     nickName: newData.memberNickName,
        //     userPhone: newData.memberPhone
        // }).then(res=>{
        //     if(res.data.flag){
        //         message.success(res.data.message);
        //     }else{
        //         message.error(res.data.message);
        //     }
        // }).catch(err=>{
        //     message.error(res.data.message);
        // })

        Api.editUserPsw({
            userName:newData.memberUserName,
            newpsw: newData.memberPasswd,
        }).then(res=>{
            if(res.data.flag){
                message.success('用户密码修改成功');
            }else{
                message.error('用户密码修改失败');
            }
        }).catch(err=>{
            message.error('用户密码修改失败');
        })

        //对话框保存后渲染本地数据
        let temp = this.state.data;
        temp.forEach(item => {
            if (item.key === this.state.dialogData.key) {
                item = this.state.dialogData.key;
            }
        })

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                // data: temp
            });
        }, 2000);
    };

    //dialog exit
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    //update dialog of content
    updateNickName = (e) => {
        let temp = this.state.dialogData;
        temp.memberNickName = e.target.value;
        this.setState({
            dialogData: temp
        })
        // console.log(e.target.value);
    }
    //更新密码
    updatePasswd = (e) => {
        let temp = this.state.dialogData;
        temp.memberPasswd = e.target.value;
        this.setState({
            dialogData: temp
        })
        // console.log(e.target.value);
    }
    //会员等级和会员状态设置
    handleChange = (value) => {
        let temp = this.state.dialogData;
        message.error('暂时无法修改数据');
        return;
        // console.log(value);
        if (value.match(/^\w+ber$/)) {
            temp.memberLevel = value === 'common' ? '普通用户' : '商铺用户';
        } else if (value.match(/^\w+able$/)) {
            temp.memberStatus = value === 'enable' ? '正常' : '禁用';
        } else {
            return;
        }

        this.setState({
            dialogData: temp
        });
    }
    //页码监听
    pageCode = (page, pageSize) => {
        //ajax todo
        Api.getUserInfo({ page: page, size: pageSize }).then(res => {
            const data = res.data;
            if (!data.flag) {
                return;
            }
            let newData = [];
            data.data.forEach((item, index) => {
                newData.push({
                    key: index,
                    memberId: item.id,
                    memberNickName: item.nickName,
                    memberUserName: item.userName,
                    memberPasswd: '******',
                    memberPhone: item.userPhone,
                    memberLevel: item.type ? '普通用户' : '商铺用户',
                    memberStatus: 1 ? '正常' : '禁用',
                    memberAvater: item.headPortraitUrl ? item.headPortraitUrl : '暂无头像',
                    createTime: item.regTiem
                })
            });

            //渲染数据
            this.setState({
                data: newData,
                intotalPage: data.total
            })
        }).catch(err => {

        })
        //UI: scroll toTop
        let contentEle = document.getElementById('content-wrap');
        contentEle.scrollTo(0, 0)
    }
    //用户删除
    handleDelete = (key) => {
        //通过key查询ID
        if (!this.state.data) {
            return;
        }
        let newData = this.state.data.filter(item => {
            return item.key === key;
        })
        //请求后台删除
        Api.delUser({ id: newData[0].memberId }).then(res => {
            if (res.data.flag) {
                message.success('删除用户成功');
                //刷新本地数据
                this.setState({
                    data: this.state.data.filter(item=>item.key != key)
                })
            } else {
                message.error('删除用户失败')
            }
        }).catch(err => {
            message.error('未知错误删除用户失败');
        })
    }
    //用户头像
    avaterUpload = (e)=>{
        // console.log(e.target.files);
        const formData = new FormData();
        formData.append('file',e.target.files[0]);
        formData.append('userName',this.state.dialogData.memberUserName);
        formData.append('token',JSON.parse(sessionStorage.getItem('userInfo')).token);
        axios({
            url: 'http://122.51.198.207:8088/tns/upload/touxiang',
            // url: 'http://localhost:3699/upload/touxiang',
            method: 'post',
            data: formData,
            headers:{
                // 'Content-Type':'multipart/form-data'
            }
        }).then(res=>{
            if(res.data.flag){
                message.success('头像替换成功');
                //更新本地数据
                let newData = this.state.dialogData;
                newData.memberAvater = res.data.data.imgurl
                this.setState({
                    dialogData: newData
                })
            }else{
                message.error('头像替换失败');
            }
        }).catch(err=>{
            message.error('未知错误头像替换失败');
        });
        
        // console.log(this.state.dialogData.memberId);
        // const userId = this.state.dialogData.memberId;
        // Api.uploadUserAvater({data:formData}).then(res=>{
        //     if(res.data.flag){
        //         message.success('头像替换成功');
        //     }else{
        //         message.error('头像替换失败');
        //     }
        // }).catch(err=>{
        //     message.error('未知错误头像替换失败');

        // })
    }
    //修改用户信息
    infoChange = (e)=>{
        let newData = this.state.dialogData;
        if(e.target.id === 'nickName'){
            message.error('后端接口未完善');
            return;
            newData.memberNickName = e.target.value;
        }else{
            newData.memberPasswd = e.target.value;
        }
        this.setState({
            dialogData: newData
        })
    }
    render() {
        const { visible, confirmLoading, ModalText, loading } = this.state;
        return (
            <>
                <div style={{ margin: '5px 0 10px' }}>
                    <Tag color="#1890FF" icon={<HomeOutlined />}>当前位置&nbsp;&gt;&nbsp;/会员管理/信息列表</Tag>
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
                        cancelText="取消"
                        okText="保存"
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                        maskClosable={false}
                    >
                        <div className="edit-wrap">
                            <div className="edit_top">
                                <div>
                                    <img src={this.state.dialogData.memberAvater} className="avater" />
                                    <input type="file" name="avaterUpload" id="avaterUpload" onChange={this.avaterUpload}/>
                                    <div>
                                        <span>替换头像</span>
                                    </div>
                                </div>
                            </div>
                            <div className="edit_bottom" style={{ marginBottom: 16 }}>
                                <div className="edit_left">
                                    <Input style={{ marginBottom: "10px" }} addonBefore="昵称" id="nickName" defaultValue="12456" value={this.state.dialogData.memberNickName} onBlur={this.updateNickName.bind(this)} onChange={this.infoChange}/>
                                    <Input addonBefore="密码" value={this.state.dialogData.memberPasswd} onBlur={this.updatePasswd.bind(this)} onChange={this.infoChange}/>

                                </div>
                                <div className="edit_right">
                                    <Tag style={{ marginBottom: "10px", height: "32px" }}>
                                        <span style={{ marginRight: "10px" }}>等级</span>
                                        <Select value={this.state.dialogData.memberLevel} style={{ width: 120 }} onChange={this.handleChange}>
                                            <Option value="common">普通用户</Option>
                                            <Option value="business">商铺用户</Option>
                                        </Select>
                                    </Tag>
                                    <Tag style={{ marginBottom: "10px", height: "32px" }}>
                                        <span style={{ marginRight: "10px" }}>状态</span>
                                        <Select value={this.state.dialogData.memberStatus} style={{ width: 120 }} onChange={this.handleChange}>
                                            <Option value="disable">禁用</Option>
                                            <Option value="enable">正常</Option>
                                        </Select>
                                    </Tag>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </>
        );
    }
}

export default MemberMange;