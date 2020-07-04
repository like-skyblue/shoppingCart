import Vue from 'vue'
import Vuex from 'vuex'
import App from '../../src/App.vue'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({//下面这几个属性是store固定的属性
    state: {  //单一状态树    ！！！state中的所有的属性和值都是响应式的，其是否发生改变都会被监测
        totalPrice: 0,  /* 计算被所有选中商品的总价 */
        counts: 0,      /* 统计当前选择商品的数量 */

        list: [
            {
                'pro_num': 3,
                'price': 200,
            },
            {
                'pro_num': 4,
                'price': 300,
            },
            {
                'pro_num': 5,
                'price': 400,
            },
            {
                'pro_num': 7,
                'price': 500,
            },
            {
                'pro_num': 3,
                'price': 200,
            },
            {
                'pro_num': 4,
                'price': 300,
            },
            {
                'pro_num': 5,
                'price': 400,
            },
            {
                'pro_num': 7,
                'price': 500,
            },
            
        ],
    },
    mutations: {
        balance(state) {
            state.totalPrice = 0; //每次将总价清零，重新计算
            state.counts = 0;       //每次在结算时，将选中的商品数量也进行重新计算


            for (var i = 0; i < state.list.length; i++) {
                // 总价累加
                state.list[i].select = state.list[i].select;
                if (state.list[i].select == true) {
                    state.counts += state.list[i].pro_num;   //每次在结算时，将选中的商品数量也进行重新计算
                    state.totalPrice += state.list[i].pro_num * state.list[i].price;
                }
            }

            // totalPrice =state.totalPrice; //把计算后的结果给totalprice，返回到页面中
        },
        //方法,当同步操作时，其值放在这，异步操作的值放在actions中
        increment(state, payload) {
            payload.count.pro_num++;
        },
        decrement(state, payload) {
            payload.count.pro_num--;
            //console.log(store.state.list);
            if (payload.count.pro_num <= 1) {
                payload.count.pro_num = 1;
            }
        },
    },
    actions: {//异步数据处理

    },
    getters: {//类似于单个组件的计算属性，当数据直接展示时，放在state中，但是当数据需要变化之后再展示，就需要使用getters
        
    },
    modules: {

    }
})

//3.到处store独享
export default store