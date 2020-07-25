import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/ShopCar.scss'

class ShopCar extends React.Component {
    render () {
        return (
            <div className="shopcarBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>购物车</h1>
                    <div className="rightBox">
                        <a className="iconfont icon-shenglvehao"></a>
                        {/* 更多选项，解开注释即可 */}
                        {/* <div className="more-list">
                            <a>
                                <span className="iconfont icon-gouwuche"></span>
                                <span>购物车</span>
                            </a>
                            <a>
                                <span className="iconfont icon-fangdajing"></span>
                                <span>搜索&nbsp;&nbsp;</span>
                            </a>
                            <a>
                                <span className="iconfont icon-leimu"></span>
                                <span>类目&nbsp;&nbsp;</span>
                            </a>
                            <a>
                                <span className="iconfont icon-fangzi"></span>
                                <span>首页&nbsp;&nbsp;</span>
                            </a>
                            <a>
                                <span className="iconfont icon-yonghu"></span>
                                <span>我的&nbsp;&nbsp;</span>
                            </a>
                        </div> */}
                    </div>
                </header>
                {/* 购物车主体 */}
                <div className="container">
                    <div className="product-body">
                        {/* 未有商品状态，解开注释即可 */}
                        {/* <div className="floor">
                            <div className="shop-empty">
                                <img src="//img.yihaodianimg.com/cart/shopping/h5/images/kongtai@2x.png"/>
                                <div className="shop-text">
                                    <p>登录并同步购物车中商品</p>
                                </div>
                                <div className="shop-btn">
                                    <a>注册</a>
                                    <a>登录</a>
                                </div>
                           </div>
                        </div> */}

                        {/* 一个商家就是一个itemLink */}
                        <div className="itemLink">
                            <div className="top_head">
                                <h2>
                                    <label>
                                        <input type="checkbox"/>
                                    </label>
                                    <a className="how-shop">
                                        <span>妙久旗舰店</span> 
                                        <img src="//img.yihaodianimg.com/cart/shopping/h5/images/arrow.png"/>
                                    </a>
                                </h2>
                            </div>
                            <di className="content-wrap">
                                <div className="product-list">
                                    <div className="product-header">
                                        <div className="sale-mod">
                                            <div className="sale-info">
                                                <span className="tag">满减</span>
                                                <span className="tag-one">购满￥39.00立减</span>
                                                <strong>￥10.00</strong>
                                            </div>
                                            <span className="play">查看活动&gt;</span>
                                        </div>

                                    </div>
                                    <div className="product-list">
                                        <div className="item-wrap">
                                            <div className="item-main">
                                                <label>
                                                    <input type="checkbox" />
                                                </label>
                                                <div className="img-box">
                                                    <img src="https://img20.360buyimg.com/cms/s264x264_jfs/t1/108153/33/12176/218792/5e9434b4E51ef0f60/c0fb082c96753e5f.jpg"/>
                                                </div>
                                                <div className="right-info">
                                                    <div className="title">
                                                        <h2>
                                                            <a>嗨吃家酸辣粉大食桶110g*6桶 方便速食重庆风味 方便粉丝 即食红薯粉 酸辣粉  </a>
                                                        </h2>
                                                    </div>
                                                    {/* <div className="change"></div> */}
                                                    <div className="price-box">
                                                        <div className="price-wrap">
                                                            <span>￥19.90</span>
                                                        </div>
                                                        <div className="buy-num">
                                                            <span className="sub">-</span>
                                                            <input type="text" className="num-box" value="1"/>
                                                            <span className="add">+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </di>
                        </div>

                        {/* 猜你喜欢 */}
                        <div className="group-like">
                            <div className="big_content">
                                <div className="mian_content">
                                    <p>猜你喜欢</p>
                                    <div className="content">
                                        <ul>
                                            <a>
                                                <div className="head-drink">
                                                    <img src="//img13.360buyimg.com/n4/s264x264_jfs/t1/79962/5/15699/172070/5dd29c9dE9d9da5a9/fc4f01580292559c.jpg"/>
                                                </div>
                                                <div className="text">
                                                    <p>量天尺 开花仙人柱室内大型绿植多肉植物组合盆栽仙人掌秘鲁苹果 单头无根 裸根不带土</p>
                                                </div>
                                                <div className="price">
                                                    <span className="price-one">￥<span className="price-two">50<em>.00</em></span></span>
                                                    <div className="addshop">
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxUlEQVRoge3YT2gcVRwH8M+2Kj3UP1jTomwpFFyFIuJBxKaLth4KiWD0ogcRhF4ETyIqYg1URMhJD4IUFfEiXmIVkyL+K060aIuipZfRg8VgJanFWsGDYjy8t93pZnYyO9kNYvKF5Tfz3u/95vt77/dnZlnDGlY3atmbhV3XT2Ek3p7HCRzEm1gYOJskLaVWq7VpryvQuxw78QYml9AtwlT8DQSdpEaFU6nhCjyAeYzh2YrPGNE+1b6jaFfP423cF+8fxWWDIlIVZcJiBsewCXcNlk7vKBvXH0XZHBSRquisQt30RpRPxGkhly6YzXuWEI4H8BCuLbB3DsfxgiT9mPJVKIsvlC+jZfUO4EnF5OFKIXQ/0Gw80jlZ9gTgO9yEYcGhsuh2Aj8L5EeFU8vvA83GNjwoOLwOo7WZ76db073U9pkod/WwpgitnZ8u1ErSU5L0eYzHkcey07048HmUwz2s6Sdej/LW7GCVExi2OBw6sQ8/KpcPC1F33xJ66/MGe3HgFGaFfnBjgd42vBJlC3kVLBs6YU2I9264LcpvsoO9vt+UyYMtwm7Nxusa7s7Ra722bIm667G5wO5YlO9nBwfhwFc4ijo+WYLU5qhTx1FJeixXq9m4VLu3HMpODcIBwm6dxI5IcChHZyjO7Yi6Yzk6LdyBq3BSkv6QnejVgRP4HdsVN6A57NF24lMXOzEUx1rk98Q13dBy7lDnRK8O/KPdxJY6hTnsttiJTvK7FZOHe6JctgO0+0GZhjZvsROd5OcLLTQbO4UcmZWkxzunLynLOoNeO/K8ECKteKcs+YCno3wtb7KKA1/iL9yMjfijxJpWTkzG+3uVId9s7Beqzzm8mKdSxYE/8bXQWG7HhyXXzSlzas3GJtyCx7EXf+NhSfpbnnrVD/VuYfRUfOBCpV+zsYAzwqbsxVncL0nf6Uak3w70A79G++PYLkkni5R7+R7I4hr8IuRCPT50+ejz/0JFOIN3sQGLvpJWElUdgJeiHHfxN/CKYjkOfIZnhEr2Hl4VKtPGPvAqjao5kMV+odls6AehDkxJ0kWv4v3IgSyeww14WWhyZRpb39CPE+gfVrAK/WdQ5VWCUPsncGe8P4InhE/D6mg28u0maVe7VUKojm9xdcf4WeEFr6oTxXYzTiw3hCbiQw5ja/wdjmMTFewty26VE2j9JbhVe7fr+AmncV1vvHPstnY7hFSwm6QX7P6vkriKA0eiPCjsfD1eZ+eqoG232ajH3V/S7qpM4lmB6FtCzJ+O18shX2y3oIyuYQ2rHf8CXIsD7dBEd/kAAAAASUVORK5CYII="/>
                                                    </div>
                                                </div>
                                            </a>
                                            <a>
                                                <div className="head-drink">
                                                    <img src="//img13.360buyimg.com/n4/s264x264_jfs/t1/79962/5/15699/172070/5dd29c9dE9d9da5a9/fc4f01580292559c.jpg"/>
                                                </div>
                                                <div className="text">
                                                    <p>量天尺 开花仙人柱室内大型绿植多肉植物组合盆栽仙人掌秘鲁苹果 单头无根 裸根不带土</p>
                                                </div>
                                                <div className="price">
                                                    <span className="price-one">￥<span className="price-two">50<em>.00</em></span></span>
                                                    <div className="addshop">
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxUlEQVRoge3YT2gcVRwH8M+2Kj3UP1jTomwpFFyFIuJBxKaLth4KiWD0ogcRhF4ETyIqYg1URMhJD4IUFfEiXmIVkyL+K060aIuipZfRg8VgJanFWsGDYjy8t93pZnYyO9kNYvKF5Tfz3u/95vt77/dnZlnDGlY3atmbhV3XT2Ek3p7HCRzEm1gYOJskLaVWq7VpryvQuxw78QYml9AtwlT8DQSdpEaFU6nhCjyAeYzh2YrPGNE+1b6jaFfP423cF+8fxWWDIlIVZcJiBsewCXcNlk7vKBvXH0XZHBSRquisQt30RpRPxGkhly6YzXuWEI4H8BCuLbB3DsfxgiT9mPJVKIsvlC+jZfUO4EnF5OFKIXQ/0Gw80jlZ9gTgO9yEYcGhsuh2Aj8L5EeFU8vvA83GNjwoOLwOo7WZ76db073U9pkod/WwpgitnZ8u1ErSU5L0eYzHkcey07048HmUwz2s6Sdej/LW7GCVExi2OBw6sQ8/KpcPC1F33xJ66/MGe3HgFGaFfnBjgd42vBJlC3kVLBs6YU2I9264LcpvsoO9vt+UyYMtwm7Nxusa7s7Ra722bIm667G5wO5YlO9nBwfhwFc4ijo+WYLU5qhTx1FJeixXq9m4VLu3HMpODcIBwm6dxI5IcChHZyjO7Yi6Yzk6LdyBq3BSkv6QnejVgRP4HdsVN6A57NF24lMXOzEUx1rk98Q13dBy7lDnRK8O/KPdxJY6hTnsttiJTvK7FZOHe6JctgO0+0GZhjZvsROd5OcLLTQbO4UcmZWkxzunLynLOoNeO/K8ECKteKcs+YCno3wtb7KKA1/iL9yMjfijxJpWTkzG+3uVId9s7Beqzzm8mKdSxYE/8bXQWG7HhyXXzSlzas3GJtyCx7EXf+NhSfpbnnrVD/VuYfRUfOBCpV+zsYAzwqbsxVncL0nf6Uak3w70A79G++PYLkkni5R7+R7I4hr8IuRCPT50+ejz/0JFOIN3sQGLvpJWElUdgJeiHHfxN/CKYjkOfIZnhEr2Hl4VKtPGPvAqjao5kMV+odls6AehDkxJ0kWv4v3IgSyeww14WWhyZRpb39CPE+gfVrAK/WdQ5VWCUPsncGe8P4InhE/D6mg28u0maVe7VUKojm9xdcf4WeEFr6oTxXYzTiw3hCbiQw5ja/wdjmMTFewty26VE2j9JbhVe7fr+AmncV1vvHPstnY7hFSwm6QX7P6vkriKA0eiPCjsfD1eZ+eqoG232ajH3V/S7qpM4lmB6FtCzJ+O18shX2y3oIyuYQ2rHf8CXIsD7dBEd/kAAAAASUVORK5CYII="/>
                                                    </div>
                                                </div>
                                            </a>
                                            <a>
                                                <div className="head-drink">
                                                    <img src="//img13.360buyimg.com/n4/s264x264_jfs/t1/79962/5/15699/172070/5dd29c9dE9d9da5a9/fc4f01580292559c.jpg"/>
                                                </div>
                                                <div className="text">
                                                    <p>量天尺 开花仙人柱室内大型绿植多肉植物组合盆栽仙人掌秘鲁苹果 单头无根 裸根不带土</p>
                                                </div>
                                                <div className="price">
                                                    <span className="price-one">￥<span className="price-two">50<em>.00</em></span></span>
                                                    <div className="addshop">
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxUlEQVRoge3YT2gcVRwH8M+2Kj3UP1jTomwpFFyFIuJBxKaLth4KiWD0ogcRhF4ETyIqYg1URMhJD4IUFfEiXmIVkyL+K060aIuipZfRg8VgJanFWsGDYjy8t93pZnYyO9kNYvKF5Tfz3u/95vt77/dnZlnDGlY3atmbhV3XT2Ek3p7HCRzEm1gYOJskLaVWq7VpryvQuxw78QYml9AtwlT8DQSdpEaFU6nhCjyAeYzh2YrPGNE+1b6jaFfP423cF+8fxWWDIlIVZcJiBsewCXcNlk7vKBvXH0XZHBSRquisQt30RpRPxGkhly6YzXuWEI4H8BCuLbB3DsfxgiT9mPJVKIsvlC+jZfUO4EnF5OFKIXQ/0Gw80jlZ9gTgO9yEYcGhsuh2Aj8L5EeFU8vvA83GNjwoOLwOo7WZ76db073U9pkod/WwpgitnZ8u1ErSU5L0eYzHkcey07048HmUwz2s6Sdej/LW7GCVExi2OBw6sQ8/KpcPC1F33xJ66/MGe3HgFGaFfnBjgd42vBJlC3kVLBs6YU2I9264LcpvsoO9vt+UyYMtwm7Nxusa7s7Ra722bIm667G5wO5YlO9nBwfhwFc4ijo+WYLU5qhTx1FJeixXq9m4VLu3HMpODcIBwm6dxI5IcChHZyjO7Yi6Yzk6LdyBq3BSkv6QnejVgRP4HdsVN6A57NF24lMXOzEUx1rk98Q13dBy7lDnRK8O/KPdxJY6hTnsttiJTvK7FZOHe6JctgO0+0GZhjZvsROd5OcLLTQbO4UcmZWkxzunLynLOoNeO/K8ECKteKcs+YCno3wtb7KKA1/iL9yMjfijxJpWTkzG+3uVId9s7Beqzzm8mKdSxYE/8bXQWG7HhyXXzSlzas3GJtyCx7EXf+NhSfpbnnrVD/VuYfRUfOBCpV+zsYAzwqbsxVncL0nf6Uak3w70A79G++PYLkkni5R7+R7I4hr8IuRCPT50+ejz/0JFOIN3sQGLvpJWElUdgJeiHHfxN/CKYjkOfIZnhEr2Hl4VKtPGPvAqjao5kMV+odls6AehDkxJ0kWv4v3IgSyeww14WWhyZRpb39CPE+gfVrAK/WdQ5VWCUPsncGe8P4InhE/D6mg28u0maVe7VUKojm9xdcf4WeEFr6oTxXYzTiw3hCbiQw5ja/wdjmMTFewty26VE2j9JbhVe7fr+AmncV1vvHPstnY7hFSwm6QX7P6vkriKA0eiPCjsfD1eZ+eqoG232ajH3V/S7qpM4lmB6FtCzJ+O18shX2y3oIyuYQ2rHf8CXIsD7dBEd/kAAAAASUVORK5CYII="/>
                                                    </div>
                                                </div>
                                            </a>
                                            <a>
                                                <div className="head-drink">
                                                    <img src="//img13.360buyimg.com/n4/s264x264_jfs/t1/79962/5/15699/172070/5dd29c9dE9d9da5a9/fc4f01580292559c.jpg"/>
                                                </div>
                                                <div className="text">
                                                    <p>量天尺 开花仙人柱室内大型绿植多肉植物组合盆栽仙人掌秘鲁苹果 单头无根 裸根不带土</p>
                                                </div>
                                                <div className="price">
                                                    <span className="price-one">￥<span className="price-two">50<em>.00</em></span></span>
                                                    <div className="addshop">
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxUlEQVRoge3YT2gcVRwH8M+2Kj3UP1jTomwpFFyFIuJBxKaLth4KiWD0ogcRhF4ETyIqYg1URMhJD4IUFfEiXmIVkyL+K060aIuipZfRg8VgJanFWsGDYjy8t93pZnYyO9kNYvKF5Tfz3u/95vt77/dnZlnDGlY3atmbhV3XT2Ek3p7HCRzEm1gYOJskLaVWq7VpryvQuxw78QYml9AtwlT8DQSdpEaFU6nhCjyAeYzh2YrPGNE+1b6jaFfP423cF+8fxWWDIlIVZcJiBsewCXcNlk7vKBvXH0XZHBSRquisQt30RpRPxGkhly6YzXuWEI4H8BCuLbB3DsfxgiT9mPJVKIsvlC+jZfUO4EnF5OFKIXQ/0Gw80jlZ9gTgO9yEYcGhsuh2Aj8L5EeFU8vvA83GNjwoOLwOo7WZ76db073U9pkod/WwpgitnZ8u1ErSU5L0eYzHkcey07048HmUwz2s6Sdej/LW7GCVExi2OBw6sQ8/KpcPC1F33xJ66/MGe3HgFGaFfnBjgd42vBJlC3kVLBs6YU2I9264LcpvsoO9vt+UyYMtwm7Nxusa7s7Ra722bIm667G5wO5YlO9nBwfhwFc4ijo+WYLU5qhTx1FJeixXq9m4VLu3HMpODcIBwm6dxI5IcChHZyjO7Yi6Yzk6LdyBq3BSkv6QnejVgRP4HdsVN6A57NF24lMXOzEUx1rk98Q13dBy7lDnRK8O/KPdxJY6hTnsttiJTvK7FZOHe6JctgO0+0GZhjZvsROd5OcLLTQbO4UcmZWkxzunLynLOoNeO/K8ECKteKcs+YCno3wtb7KKA1/iL9yMjfijxJpWTkzG+3uVId9s7Beqzzm8mKdSxYE/8bXQWG7HhyXXzSlzas3GJtyCx7EXf+NhSfpbnnrVD/VuYfRUfOBCpV+zsYAzwqbsxVncL0nf6Uak3w70A79G++PYLkkni5R7+R7I4hr8IuRCPT50+ejz/0JFOIN3sQGLvpJWElUdgJeiHHfxN/CKYjkOfIZnhEr2Hl4VKtPGPvAqjao5kMV+odls6AehDkxJ0kWv4v3IgSyeww14WWhyZRpb39CPE+gfVrAK/WdQ5VWCUPsncGe8P4InhE/D6mg28u0maVe7VUKojm9xdcf4WeEFr6oTxXYzTiw3hCbiQw5ja/wdjmMTFewty26VE2j9JbhVe7fr+AmncV1vvHPstnY7hFSwm6QX7P6vkriKA0eiPCjsfD1eZ+eqoG232ajH3V/S7qpM4lmB6FtCzJ+O18shX2y3oIyuYQ2rHf8CXIsD7dBEd/kAAAAASUVORK5CYII="/>
                                                    </div>
                                                </div>
                                            </a>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 结算框 */}
                <div className="confirm-box">
                    <label>
                        <input type="checkbox"/>
                    </label>
                    <div className="checkall">全选</div>
                    <div className="price">
                        <div className="price-wrap">
                            <span>￥45.90</span>
                            <span>(不含运费)</span>
                        </div>
                    </div>
                    <a>
                        <button>
                            去结算
                            <span className="num">(1)</span>
                        </button>
                    </a>
                </div>
            </div>
        )
    }
}

export default ShopCar