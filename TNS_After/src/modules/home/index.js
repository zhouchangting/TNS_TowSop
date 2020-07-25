import React, { lazy } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Avatar, Button } from 'antd';
import {
    UserOutlined,
    DownOutlined,
    AppstoreOutlined,
    ShoppingOutlined,
    FormOutlined,
    CommentOutlined,
    FormatPainterOutlined,
    AreaChartOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    NotificationOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;

import './index.scss';
import logo from '#/images/logo.png';
// import header from '#/images/header.png';

import MemberMange from './pages/memberMange';
// const MemberMange = lazy(() => import('./pages/memberMange'));
// import AvaterMange from './pages/memberMange/avatarMange';
import StoreMange from './pages/storeMange';
// const StoreMange = lazy(() => import('./pages/storeMange'));
import GoodsMange from './pages/goodsMange';
// const GoodsMange = lazy(() => import('./pages/goodsMange'));
// import GoodsMangeTwo from './pages/goodsMange/index2';
// import GoodsMangeThree from './pages/goodsMange/index3';
// import GoodsMangeFour from './pages/goodsMange/index4';
// import GoodsMangeFive from './pages/goodsMange/index5';
// import GoodsMangeSix from './pages/goodsMange/index6';

import OrderMange from './pages/orderMange';
// const OrderMange = lazy(() => import('./pages/orderMange'));
import ShoppingCartMange from './pages/shoppingCartMange';
// const ShoppingCartMange = lazy(() => import('./pages/shoppingCartMange'));
import CommentMange from './pages/commentMange';
// const CommentMange = lazy(() => import('./pages/commentMange'));
import SitesDecoration from './pages/sitesDecoration';
// const SitesDecoration = lazy(() => import('./pages/sitesDecoration'));
import OperationStat from './pages/operationStat';
// const OperationStat = lazy(() => import('./pages/operationStat'));
import Marketing from './pages/marketing';
// const Marketing = lazy(() => import('./pages/marketing'));
import SystemSetting from './pages/systemSetting';
// const SystemSetting = lazy(() => import('./pages/systemSetting'));
import Login from '../login'
// const Login = lazy(() => import('../login'));
// import {withLogin} from '@/utils/Hoc'

// import Api from '@/utils/api';



class Home extends React.Component {
    constructor() {
        super(),
            this.state = {
                nickName: 'Admin',
                avatar: '',
                collapsed: false,
                mWidth: '200px',
                openKeys: [],
                defaultOpenKeys: [],
                defaultSelectedKeys: ['/operation-stat'],
                menu: [
                    {
                        path: '/member-mange',
                        title: '会员管理',
                        icon: UserOutlined,
                        children: [
                            {
                                path: '/',
                                title: '信息列表',
                                component: MemberMange,
                            },
                            // {
                            //     path: '/avatar-mange',
                            //     title: '头像管理',
                            //     component: AvaterMange
                            // }
                        ]
                    },
                    {
                        path: '/store-mange',
                        title: '商铺管理',
                        icon: AppstoreOutlined,
                        children: [
                            {
                                path: '/',
                                title: '商铺列表',
                                component: StoreMange,
                            },
                            // {
                            //     path: '/avatar-mange',
                            //     title: '招牌管理',
                            //     component: AvaterMange
                            // },
                            // {
                            //     path: '/avatar-ange',
                            //     title: '招牌123',
                            //     component: AvaterMange
                            // }
                        ]
                    },
                    {
                        path: '/goods-mange',
                        title: '商品管理',
                        icon: ShoppingOutlined,
                        children: [
                            {
                                path: '/',
                                title: '商品列表',
                                component: GoodsMange,
                            },
                            // {
                            //     path: '/two',
                            //     title: '坚果炒货',
                            //     component: GoodsMangeTwo,
                            // },
                            // {
                            //     path: '/three',
                            //     title: '衣物清洁',
                            //     component: GoodsMangeThree,
                            // },
                            // {
                            //     path: '/four',
                            //     title: '冷冻冷藏',
                            //     component: GoodsMangeFour,
                            // },
                            // {
                            //     path: '/five',
                            //     title: '坚果炒货',
                            //     component: GoodsMangeFive,
                            // },
                            // {
                            //     path: '/six',
                            //     title: '坚果炒货',
                            //     component: GoodsMangeSix,
                            // }

                        ]
                    },
                    {
                        path: '/order-mange',
                        title: '订单管理',
                        icon: FormOutlined,
                        component: OrderMange,
                        children: [
                            {
                                path: '/',
                                title: '订单列表',
                                component: OrderMange,
                            }
                        ]
                    },
                    {
                        path: '/shopping-cart-mange',
                        title: '购物车管理',
                        icon: ShoppingCartOutlined,
                        children: [
                            {
                                path: '/',
                                title: '购物车列表',
                                component: ShoppingCartMange,
                            }
                        ]
                    },
                    {
                        path: '/comment-mange',
                        title: '评论管理',
                        icon: CommentOutlined,
                        children: [
                            {
                                path: '/',
                                title: '评论列表',
                                component: CommentMange,
                            }
                        ]
                    },
                    {
                        path: '/sites-decoration',
                        title: '网站装修',
                        icon: FormatPainterOutlined,
                        children: [
                            {
                                path: '/',
                                title: '商城首页',
                                component: SitesDecoration
                            },
                            {
                                path: '2',
                                title: '登录注册',
                                component: ''
                            },
                            {
                                path: '3',
                                title: '订单查询',
                                component: ''
                            },
                            {
                                path: '4',
                                title: '用户我的',
                                component: ''
                            },
                            {
                                path: '5',
                                title: '店铺我的',
                                component: ''
                            }
                        ]
                    },
                    {
                        path: '/operation-stat',
                        title: '运营统计',
                        icon: AreaChartOutlined,
                        component: OperationStat
                    },
                    {
                        path: '/marketing',
                        title: '营销推广',
                        icon: NotificationOutlined,
                        component: Marketing
                    },
                    {
                        path: '/system-setting',
                        title: '系统设置',
                        icon: SettingOutlined,
                        component: SystemSetting
                    },
                ]
            };
        // console.log('...',this.props);
    }
    componentWillMount() {
        //获取当前location设置为左侧的导航栏默认选择key
        let curPath = this.props.location.pathname
        curPath = curPath.substr(5);
        // console.log(curPath);
        //判断是否第一次进来
        curPath ? this.setState({ defaultSelectedKeys: [`${curPath}`] }) : 0;


        //设置默认上次打开的菜单
        //  01.获取刷新前的openKey
        curPath = curPath.split('/')[1];
        //  02.设置当前的openKey
        this.setState({ openKeys: [`/${curPath}`] });

    }
    componentDidMount() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if (!userInfo || !userInfo.token) {
            this.props.history.push('/login');

            return;
        }
        this.setState({
            nickName: userInfo.nickName,
            avatar: userInfo.avaterImg
        })
    }
    goto = (path, curPn) => {
        this.props.history.push({ pathname: this.props.match.path + path });
    }
    //菜单栏收缩
    onOpenChange = (openKeys) => {
        //返回openKeys中最新打开的subMenu
        const lasterOpenKey = openKeys.find(key => this.state.openKeys[0] != key);
        // console.log('cur',lasterOpenKey);
        //是否为未打开的subMenu
        if (lasterOpenKey) {
            this.setState({ openKeys: [lasterOpenKey] });
        } else {
            this.setState({ openKeys: [] });
        }
        //记录打开的菜单备刷新使用
    }
    onClick = ({ key }) => {
        // message.info(`Click on item ${key}`);
    };
    //侧栏收缩事件
    toggleCollapsed = () => {
        if (this.state.collapsed) {
            this.setState({
                collapsed: !this.state.collapsed,
                mWidth: '200px'
            });

        } else {
            this.setState({
                collapsed: !this.state.collapsed,
                mWidth: '0'
            });
        }
    };
    //退出
    logout = () => {
        sessionStorage.removeItem('userInfo');
        this.props.history.push('/login');
    }
    //导航下拉菜单
    avatarMenu = (
        <Menu onClick={this.onClick} style={{ top: '18px', background: '#000' }}>
            {/* <Menu.Item key="1" style={{color:'#FFF'}}>个人资料</Menu.Item>
                <Menu.Item key="2">修改密码</Menu.Item> */}
            <Menu.Item key="3" style={{ color: '#FFF' }} onClick={this.logout}>退出登录</Menu.Item>
        </Menu>
    );
    render() {
        return (
            <div id="home_wrap">
                <header>
                    <div className="logo">
                        <a href="###">
                            <img src={logo} style={{ height: '100%' }} />
                            <span>TNS运营管理平台</span>
                        </a>
                    </div>
                    <div className="avatar">
                        <Dropdown overlay={this.avatarMenu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <Avatar size="large" src={this.state.avatar} />
                                <span style={{ margin: '0 5px 0 15px', fontSize: '16px' }}>{this.state.nickName}</span>
                                <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </header>
                <main>
                    <aside style={{ minWidth: this.state.mWidth }}>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{ float: 'right' }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <Menu
                            defaultSelectedKeys={this.state.defaultSelectedKeys}
                            // defaultOpenKeys={this.state.defaultOpenKeys}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                            onOpenChange={this.onOpenChange}
                            openKeys={this.state.openKeys}
                        // openKeys={['/member-mange']}
                        >
                            {
                                this.state.menu.map(item => (
                                    item.children ?
                                        <SubMenu key={item.path} icon={<item.icon />} title={item.title}>
                                            {/* <Menu.Item key={item.path} onClick={this.goto.bind(null, item.path)}>信息列表</Menu.Item> */}
                                            {
                                                item.children.map(child => (
                                                    <Menu.Item key={item.path + child.path} onClick={this.goto.bind(null, item.path + child.path)}>{child.title}</Menu.Item>
                                                ))
                                            }
                                        </SubMenu>
                                        :
                                        <Menu.Item key={item.path} icon={<item.icon />} onClick={this.goto.bind(null, item.path, item.title)}>{item.title}</Menu.Item>
                                ))
                            }
                        </Menu>
                    </aside>
                    <main id="content-wrap">
                        <Switch>
                            {
                                this.state.menu.map(item => (
                                    // <Route key={item.path} path={'/home' + item.path} component={item.component} exact />
                                    item.children ?
                                        item.children.map(child => (
                                            <Route key={'home' + item.path + child.path} path={'/home' + item.path + child.path} component={child.component} exact />
                                        ))
                                        :
                                        <Route key={'home' + item.path} path={'/home' + item.path} component={item.component} exact />
                                ))
                            }
                            <Route path="/login" component={Login} />
                            <Redirect from="/" to="/home/operation-stat" />
                            <Redirect to="/404" />
                        </Switch>
                    </main>
                </main>
            </div>
        )
    }
}

class Home2 extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                number: 1
            };
        // console.log('...',this.props);
        // console.log('home page');
    }
    componentDidMount() {

    }
    render() {
        return (
            <div id="home_wrap">
                Test page
            </div>
        )
    }
}

// Home = withLogin(Home);
// Home = withRouter(Home);
export default Home;
