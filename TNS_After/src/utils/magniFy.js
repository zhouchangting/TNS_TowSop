/**
 * 放大镜插件,by:seoyoyo@qq.com
 * 带*必传,其他选传
 * *el:要插入的DOM父节点(如若插入的节点没有定位,则位置参数不生效)
 * id:string-插入节点的ID
 * boxLeft:number-插入节点左定位
 * boxTop:number-插入节点右定位
 * *maskratio:number-遮罩层比例,以及图片缩放比例
 * boxZIndex:number-插入元素的图层
 * spanZIndex:number -遮罩层图层
 * color:string-遮罩层颜色
 * --------以下是方法--------
 * *mousemove(left,top,br):需在移动时调用,设置遮罩层坐标,以及放大图片坐标,前两个参数:number,[第三个参数:br值,为true则限制遮罩层不出界,否则不限制]
 * *mousein(imgSrc):需移入调用,传入需要放大的图片src
 * *mouseout():移出时调用
 */
class Magnifying {
    constructor(obj) {
        this.el = obj.el//插入的父节点

        //放大的图片盒子
        this.box = document.createElement('div')
        this.box.style.zIndex = obj.boxZIndex ? obj.boxZIndex : 5
        this.box.id = obj.id
        this.box.style.position = 'absolute'
        this.box.style.width = this.el.offsetWidth + 'px'
        this.box.style.height = this.el.offsetHeight + 'px'
        this.box.style.display = 'none'
        this.box.style.overflow = 'hidden'
        this.box.style.left = (obj.boxLeft ? +obj.boxLeft + +this.el.offsetWidth : +this.el.offsetWidth + 10) + 'px'
        this.box.style.top = (obj.boxTop ? +obj.boxTop : 0) + 'px'
        this.bigImg = document.createElement('img')
        this.magnification = 1 / obj.maskratio
        this.bigImg.style.width = this.magnification * this.el.offsetWidth + 'px'
        this.bigImg.style.height = this.magnification * this.el.offsetHeight + 'px'
        this.bigImg.style.position = 'absolute'
        //遮罩层span
        this.maskratio = obj.maskratio
        this.span = document.createElement('span')
        this.span.style.display = 'none'
        this.span.style.pointerEvents = 'none'
        this.span.style.zIndex = obj.spanZIndex ? obj.spanZIndex : 5
        this.span.style.width = this.maskratio * this.el.offsetWidth + 'px'
        this.span.style.height = this.maskratio * this.el.offsetHeight + 'px'
        this.span.style.backgroundColor = obj.color ? obj.color : 'rgba(0,0,0,0.3)'
        this.span.style.position = 'absolute'

        this.el.appendChild(this.span)
        this.box.appendChild(this.bigImg)
        this.el.appendChild(this.box)
    }
    mousemove(left, top, br) {
        if (br) {
            if (top - this.span.offsetHeight / 2 < 0) {
                top = this.span.offsetHeight / 2
            }
            if (left - this.span.offsetWidth / 2 < 0) {
                left = this.span.offsetWidth / 2
            }
            if (top - this.span.offsetHeight / 2 > this.el.offsetHeight - this.span.offsetHeight) {
                top = this.el.offsetHeight - this.span.offsetHeight / 2
            }
            if (left - this.span.offsetWidth / 2 > this.el.offsetWidth - this.span.offsetWidth) {
                left = this.el.offsetWidth - this.span.offsetWidth / 2
            }
        }
        this.span.style.top = top - this.span.offsetHeight / 2 + 'px'
        this.span.style.left = left - this.span.offsetWidth / 2 + 'px'

        this.bigImg.style.top = -((top - this.span.offsetHeight / 2) * this.magnification) + 'px'
        this.bigImg.style.left = -((left - this.span.offsetWidth / 2) * this.magnification) + 'px'
        return this
    }
    mousein(imgSrc) {
        this.span.style.display = 'inline-block'
        this.bigImg.src = imgSrc
        this.box.style.display = 'block'
        return this
    }
    mouseout() {
        this.span.style.display = 'none'
        this.box.style.display = 'none'
        return this
    }
}

function imgBig(big, src, event) {
    if (big === 'big') {
        this.imgBigProperty.state = true
        this.imgBigProperty.src = src
        let img = document.querySelector('#greensName .bigImg')
        let _this = this
        img.onload = function () {
            let height = event.clientY - img.offsetHeight - 10
            if (height < 0) height = 0
            _this.imgBigProperty.top = height + 'px'
            _this.imgBigProperty.left = event.clientX - img.offsetWidth - 10 + 'px'
        }
    } else {
        this.imgBigProperty.state = false
    }
}

export default Magnifying;