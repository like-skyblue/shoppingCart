import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import axios from 'axios'


Vue.config.productionTip = false

//Vue.prototype.$store=store   vue源码

new Vue({
  store,//在vue中挂载store属性，在vue全局中都可以使用该属性
  render: h => h(App),
  mounted() {
    // axios
    //   .post('https://www.runoob.com/try/ajax/demo_axios_post.php')
    //   .then(response => (this.info = response))
    //   .catch(function (error) { // 请求失败处理
    //     console.log(error);
    //   });
  },
}).$mount('#app')


// axios.all([axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
// }), axios({
//   url: 'http://123.207.32.32:8000/home/data',//默认method为get方法，get的参数写在params中，post的请求的参数写在data:{key:'aa'}
//   params: {
//     type: 'sell',
//     page: 5 
//   }
// })])
//   .then(results => {
//     console.log(results)
//     console.log(results[0].data.data.banner.list)
  
//   })

// const instance1=axios.create({
//   baseURL:'http://123.207.32.32:8000',
//   timeout:5000
// })

// instance1({
//   url:'/home/multidata'
// }).then(res=>{
//   console.log(res);
// })

// instance1({
//   url:'/home/data',
//   params:{
//     type:'pop',
//     page:1
//   }
// }).then(res=>{
//   console.log(res);
  
// })


















