import React from 'react';
import { Tag, Input, Select, Table, Button, Popconfirm, Modal, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons'

const { Search } = Input;
const { Option } = Select;
import './index.scss';
import Api from '@/utils/api';


class GoodsMange extends React.Component {
    constructor() {
        super();
        this.state = {
            pData: '',
            data: '',
            intotalPage: 0,
            confirmLoading: false,
            visible: false,
            key: '',
            columns: [
                { title: 'Uuid', dataIndex: 'id', align: 'center' },
                { title: '商品类型', dataIndex: 'type', align: 'center' },
                { title: '商品标题', dataIndex: 'typemin', align: 'center' },
                { title: '商品别名', dataIndex: 'alias', align: 'center' },
                { title: '商品折扣', dataIndex: 'discount', align: 'center' },
                { title: '商品价格', dataIndex: 'price', align: 'center' },
                { title: '商品库存', dataIndex: 'stock', align: 'center' },
                {
                    title: '商品图片', dataIndex: 'imgsrc', align: 'center',
                    render: (value)=>{
                        //处理处理
                        // console.log('......',value);
                        const newData = value.split(',');
                        return (
                            <>
                                {
                                    newData.map((item,index)=>{
                                       return (
                                           <div key={index} style={{margin: "0 5px", float: "left"}}>
                                               <img src={item} style={{ height: '32px' }} />
                                           </div>
                                       )
                                    })
                                }
                            </>
                        )
                    }
                },
                { title: '审核状态', dataIndex: 'checkes', align: 'center' },
                { title: '商品状态', dataIndex: 'situation', align: 'center' },
                { title: '商品总标题', dataIndex: 'goodstitle', align: 'center' },
                { title: '商品描述', dataIndex: 'describes', align: 'center' },
                { title: '商铺名称', dataIndex: 'shopName', align: 'center' },
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
            ]
        }
        this.handleOperation = this.handleOperation.bind(this);
    }
    componentDidMount() {
        Api.getGoodsInfo({ page: 1, size: 10 }).then(res => {
            // console.log('...',res.data.data.p[0].imgsrc);
            if (res.data.flag) {
                let newData = res.data.data.p;
                res.data.data.p.forEach((item, index) => {
                    newData[index].key = item.id;
                });
                this.setState({
                    data: newData,
                    intotalPage: res.data.total
                })
            }
        }).catch(err => {
            message.error('获取商品信息出错');
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

        let newData = this.state.data.filter(item => {
            return item.key === this.state.key;
        })

        Api.auditGoods({ id: newData[0].id, audit: '通过' }).then(res => {
            if (res.data.flag) {
                message.success('审核通过');

                newData = this.state.data.filter(item=>{
                    return item.key !== this.state.key;
                })

                this.setState({
                    data: newData,
                    total: newData.length
                })

            } else {
                throw '审核不通过';
            }
        }).catch(err => {
            message.error(err);
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

        let newData = this.state.data.filter(item => {
            return item.key === this.state.key;
        })

        if (e.target.innerHTML === '审核不通过') {
            Api.auditGoods({ id: newData[0].id, audit: '不通过' }).then(res => {
                if (res.data.flag) {
                    newData[0].audit = '不通过';
                    message.success('该商铺审核不通过');


                    newData = JSON.parse(JSON.stringify(this.state.data));
                    newData.forEach(item=>{
                        if(item.key === this.state.key){
                            item.checkes = '不通过'
                        }
                    })
    
                    this.setState({
                        data: newData,
                    })   
                } else {
                    throw '审核出错';
                }
            }).catch(err => {
                message.error(err);
            })
        } else {
            return;
        }
    }

    pageCode = (page, size) => {
        //ajax todo
        Api.getGoodsInfo({ page: page, size: size, userName: 'admin' }).then(res => {
            if (res.data.flag) {
                let newData = res.data.data.p;
                res.data.data.p.forEach((item, index) => {
                    newData[index].key = item.id;
                });
                this.setState({
                    data: newData,
                    intotalPage: res.data.total
                })
            }
        }).catch(err => {
            message.error('获取商品信息出错');
        })
    }

    render() {
        return (
            <>
                <div style={{ margin: '5px 0 10px' }}>
                    <Tag color="#1890FF" icon={<HomeOutlined />}>当前位置&nbsp;&gt;&nbsp;/商品管理/海鲜水产</Tag>
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
                    scroll={{ x: 'calc(700px + 150%)' }}
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
                        <textarea className="edit-textarea" placeholder="审核留言">

                        </textarea>
                    </Modal>
                </div>
            </>
        )
    }
}

export default GoodsMange;