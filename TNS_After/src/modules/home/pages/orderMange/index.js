import React from 'react';
import { Tag, Input, Select, Table, Button, Popconfirm, Modal, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons'

const { Search } = Input;
const { Option } = Select;
import './index.scss';
import Api from '@/utils/api';

class OrderMange extends React.Component {
    constructor() {
        super();
        this.state = {
            data: '',
            intotalPage: 0,
            confirmLoading: false,
            visible: false,
            columns: [
                { title: 'Uuid', dataIndex: 'id', align: 'center' },
                { title: '商品标题', dataIndex: 'title', align: 'center' },
                { title: '商品名称', dataIndex: 'typemin', align: 'center' },
                {
                    title: '商品图片', dataIndex: 'goodImg', align: 'center',
                    render: (value)=>{
                        return (
                            <div className="img-wrap">
                                <img src={value}/>
                            </div>
                        )
                    }
                },
                { title: '商品详情', dataIndex: 'alias', align: 'center' },
                { title: '商品数量', dataIndex: 'goodNum', align: 'center' },
                { title: '商品Uuid', dataIndex: 'minid', align: 'center' },
                { title: '账号', dataIndex: 'userName', align: 'center' },
                { title: '收货人', dataIndex: 'consignee', align: 'center' },
                { title: '收货省份', dataIndex: 'district', align: 'center' },
                { title: '收货地址', dataIndex: 'detailedly', align: 'center' },
                { title: '商铺名称', dataIndex: 'shopName', align: 'center' },
                // {
                //     title: '操作',
                //     dataIndex: 'operation',
                //     fixed: 'right',
                //     align: 'center',
                //     render: (_, record) => {
                //         return (
                //             <>
                //                 <Button type="primary" size="default" style={{ marginRight: '20px' }} onClick={this.handleOperation.bind(null,record.key)}>审核</Button>
                //                 <Popconfirm title="此操作不可逆，是否删除?" cancelText="取消" okText="确定" onConfirm={() => this.handleDelete(record.key)}>
                //                     <Button type="primary" size="default" danger>删除</Button>
                //                 </Popconfirm>
                //             </>
                //         )
                //     }
                // }
            ]
        }
        this.handleOperation = this.handleOperation.bind(this);
        // this.testImg = this.testImg.bind(this);
    }
    componentDidMount() {
        Api.getOrderInfo({ page: 1, size: 10 }).then(res => {
            if (res.data.flag) {
                let newData = res.data.data;

                newData.forEach(item => {
                    item.key = item.id;
                })

                this.setState({
                    data: res.data.data,
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

    testImg = (e)=>{
        // console.log(e.clientY);
        let elImg = document.getElementById('img_big');
        elImg.parentNode.style.display = 'block';
        elImg.src = e.target.src;
    }
    outImg = (e)=>{
        let elImg = document.getElementById('img_big');
        elImg.parentNode.style.display = 'none';
    }

    handleDelete = (key) => {

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
    }

    render() {
        return (
            <>
                <div style={{ margin: '5px 0 10px' }}>
                    <Tag color="#1890FF" icon={<HomeOutlined />}>当前位置&nbsp;&gt;&nbsp;/订单管理/订单列表</Tag>
                    <Search
                        placeholder="input search text"
                        enterButton="查询"
                        size="middle"
                        onSearch={value => console.log(value)}
                        style={{ maxWidth: '300px', float: 'right' }}
                    />
                </div>
                <div id="img_father">
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
                        scroll={{ x: 'calc(700px + 130%)' }}
                    />
                    <div class="img_big">
                        <img id="img_big"/>
                    </div>
                </div>
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

export default OrderMange;