import React from 'react';
import { Tag, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import echarts from 'echarts';

const { Search } = Input;

import './index.scss'

class OperationStat extends React.Component {
    constructor() {
        super();
        this.state = {
            option: {
                title: {
                    text: '网站流量访问统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['网站用户', '百度推广', '直接访问', '搜索引擎']
                },
                toolbox: {
                    show: false,
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '网站用户',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [8200, 38000, 9010, 9340, 12900, 43200, 53020]
                    },
                    {
                        name: '百度推广',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [1500, 2320, 2010, 1504, 1900, 3300, 4010]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [2200, 1802, 1910, 2034, 2900, 3300, 3010]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {},
                        data: [1220, 3320, 9000, 3340, 3900, 8000, 6400]
                    }
                ]
            },
            option1: {
                title: {
                    text: '商品推广统计（月）',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },

                toolbox: {
                    show: false,
                    feature: {
                        mark: {show: true},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        saveAsImage: {show: true}
                    }
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: [
                            {value: 10, name: '家具'},
                            {value: 5, name: '话费'},
                            {value: 15, name: '书籍'},
                            {value: 25, name: '粮油'},
                            {value: 20, name: '饮料'},
                            {value: 35, name: '配件'},
                            {value: 30, name: '零食'},
                            {value: 40, name: '服装'}
                        ]
                    }
                ]
            },
            option2: {
                title: {
                    text: '商铺入驻统计（年）'
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
            }
        }
    }

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('operationStatContent'));
        myChart.setOption(this.state.option);

        let myChart1 = echarts.init(document.getElementById('goodsStatLeft'));
        myChart1.setOption(this.state.option1);

        let myChart2 = echarts.init(document.getElementById('goodsStatRight'));
        myChart2.setOption(this.state.option2);
    }
    render() {
        return (
            <div className="operation-stat-wrap">
                <div className="header">
                    <Tag color="#1890FF" icon={<HomeOutlined />}>当前位置&nbsp;&gt;&nbsp;/运营统计</Tag>
                    <Search
                        placeholder="input search text"
                        enterButton="查询"
                        size="middle"
                        onSearch={value => console.log(value)}
                        style={{ maxWidth: '300px', float: 'right' }}
                    />
                </div>
                <div id="operationStatContent"></div>
                <div className="goodsStat">
                    <div id="goodsStatLeft"></div>
                    <div id="goodsStatRight"></div>
                </div>
            </div>
        )
    }
}

export default OperationStat;