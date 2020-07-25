// import {createStore} from 'redux'

// // 初始状态
// const initState = {
//     goodslist:[],
//     totalPrice:0,
//     step:0
// }

// // reducer
// // 作用：指定state的修改逻辑，创建一个新state的并返回(覆盖旧的)
// function reducer (state=initState,action) {
//     switch(action.type) {
//         // 添加商品
//         case 'add_to_cart' :
//             return {
//                 ...state,
//                 goodslist:[action.goods,...state.goodslist]
//             }
//         // 删除商品
//         case 'remove_from_cart' :
//             return {
//                 ...state,
//                 goodslist:state.goodslist.filter(item => item.goods_id!=action.goods_id)
//             }
//         // 修改数量
//         case 'change_qty' :
//             return {
//                 ...state,
//                 goodslist:state.goodslist.map(item=> {
//                     if (item.goods_id === action.goods_id) {
//                         item.goods_qty = action.goods_qty
//                     }
//                     return item
//                 })
//             }
//         // 情况商品
//         case 'change_qty' :
//             return {
//                 ...state,
//                 goodslist:[]
//             }
//         default:
//             return state
//     }
// }

// const store = createStore(reducer)

// export default store