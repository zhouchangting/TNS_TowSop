import React from 'react';
import { Breadcrumb, Card, Button, Tag, Input, message } from 'antd';
import { HomeOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Search } = Input;

const handClick = () => {
    message.success('模板修改成功')
}

//网站装修
function SitesDecoration() {

    return (
        <div className="ShopListBox">
            <div style={{ margin: '5px 0 50px' }}>
                <Tag color="#1890FF" icon={<HomeOutlined />}>当前位置&nbsp;&gt;&nbsp;/网站装修/网站首页</Tag>
                <Search
                    placeholder="选择需要的模板"
                    enterButton="查询"
                    size="middle"
                    onSearch={value => console.log(value)}
                    style={{ maxWidth: '300px', float: 'right' }}
                />
            </div>
            <div className="container">
                <Card
                    hoverable
                    style={{ width: 240, display: 'inline-block' }}
                    cover={<img alt="example" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=334680765,3123598504&fm=26&gp=0.jpg" height="400px" />}
                    onClick={handClick}
                >
                    <Meta title="黑白风系列" description="黑白简洁" />
                </Card>,
                <Card
                    hoverable
                    style={{ width: 240, display: 'inline-block', marginRight: 10 }}
                    cover={<img alt="example" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2626130389,2952692784&fm=26&gp=0.jpg" height="400px" />}
                    onClick={handClick}
                >
                    <Meta title="新年系列" description="新年抢年货样式" />
                </Card>,
             <Card
                    hoverable
                    style={{ width: 240, display: 'inline-block', marginRight: 10 }}
                    cover={<img alt="example" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1420742416,3582797282&fm=26&gp=0.jpg" height="400px" />}
                    onClick={handClick}
                >
                    <Meta title="双十一系列" description="双十一抢购样式" />
                </Card>,
                <Card
                    hoverable
                    style={{ width: 240, display: 'inline-block', marginRight: 10 }}
                    cover={<img alt="example" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=200189130,1037038699&fm=26&gp=0.jpg" height="400px" />}
                    onClick={handClick}
                >
                    <Meta title="情人节系列" description="一见倾心" />
                </Card>,
             <Card
                    hoverable
                    style={{ width: 240, display: 'inline-block', marginRight: 10 }}
                    cover={<img alt="example" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1477125906,4176587313&fm=26&gp=0.jpg" height="400px" />}
                    onClick={handClick}
                >
                    <Meta title="双十二系列" description="双十二抢购样式" />
                </Card>
            </div>
        </div>
    )
}

export default SitesDecoration;