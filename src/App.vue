<template>
  <div id="app">
    <div class="car-box">
      <div class="car-title">
        <div class="null">列表</div>
        <div class="sys a">
          <span class="half a">商品</span>
          <span class="half a">规格</span>
        </div>
        <div class="price a">单价</div>
        <div class="count a">数量</div>
        <div class="money a">金额</div>
        <div class="option a">操作</div>
      </div>

      <div class="item-list" v-for="(item,index) in $store.state.list">
        <div class="item-single">
          <div class="check-box">
            <input
              type="checkbox"
              name="checkItem"
              class="check-item"
              @click="select(item,index)"
              v-model="single[index]"
            />
            <!-- :value="item.select" -->
            <div class="car-img">
              <!-- <img
                src="https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg"
                alt="商品图片"
              />-->
              <img :src="img[index]" alt="商品图片" />
              <!-- <img :src="item.image" alt="商品图片" /> -->
              
              <!-- <img src="https://www.xiaoyuezhang.com/img/06.jpg" alt="商品图片"> -->
            </div>
          </div>
          <div class="car-goods-msg">
            <div>
              <h2>超级好看的美女服饰</h2>
            </div>
            <div>
              <p>图案选择：海豚蓝色</p>
              <p>形状尺寸：迷你胖肚</p>
            </div>
          </div>
          <div style="font-weight:bold">
            <span class="price">￥{{item.price}}</span>
          </div>
          <div>
            <div class="number">
              <!-- <span @click="subtraction(item)">-</span> -->

              <button @click="subtraction(item,index)">-</button>
              <span>{{item.pro_num}}</span>
              <!-- <span @click="addition(item)">+</span>   -->
              <button @click="addition(item,index)">+</button>
              <!-- <span @click="addition">+</span> -->
            </div>
          </div>
          <div class="total">
            <span class="total-money">￥{{item.pro_num*item.price}}</span>
          </div>
          <div class="handle">
            <p @click="delet(item,index)">删除</p>
            <p>加入到我的收藏</p>
          </div>
        </div>
      </div>
    </div>

    <div class="car-tool">
      <input type="checkbox" @click="allselect(this)" v-model="allse1" />
      <span>全选</span>
      <span @click="massDelet() ">删除选中</span>
      <span>移入收藏夹</span>
      <span>清除下架宝贝</span>
      <span>
        已选择商品
        <strong>{{$store.state.counts}}件</strong>
      </span>
      <span>合计：</span>
      <span>￥{{$store.state.totalPrice}}</span>
      <a>
        <p>结算</p>
      </a>
    </div>

    <div></div>
  </div>
</template>
 

 

<script>
import HelloVuex from "./components/HelloVuex";
import store from "./store/index";
import axios from "axios";

export default {
  name: "App",

  data() {
    return {
      message: "App组件",
      allse1: false, //全选按钮的值
      single: [], //每个单选按钮的值
      img: [] //存放图片的src值

      /* counter:0, */
    };
  },

  created() {
    const instance1 = axios.create({
      baseURL: "http://123.207.32.32:8000"
      // timeout: 5000
    });

    instance1({
      url: "/home/multidata"
    }).then(res => {
      console.log(res);

      console.log(res.data.data.banner.list);
      for (var i = 0; i < res.data.data.banner.list.length; i++) {
        this.img[i] = res.data.data.banner.list[i].image;
      }
      this.$forceUpdate(); //当数据请求到之后强制重新渲染页面
    });

    instance1({
      url: "/home/data",
      params: {
        type: "pop",
        page: 1
      }
    }).then(res => {
      console.log(res);
    });
  },
  computed: {},
  methods: {
    balance() {
      //结算
      this.$store.commit({
        type: "balance"
      });
    },
    addition(count, index) {
      //增加商品数量
      this.$store.commit({
        type: "increment",
        count
      });
      this.balance();
    },
    subtraction(count, index) {
      //减少商品数量
      this.$store.commit({
        type: "decrement",
        count
      });

      this.balance();
    },

    delet(a, index) {
      //删除单个商品按钮
      for (var j = 0; j < store.state.list.length; j++) {
        if (a.__ob__.dep.id == store.state.list[j].__ob__.dep.id) {
          this.single.splice(j, 1); //点击删除之后应该将存储复选框的数据也删除，防止出现数据删除了，但是还是显示原来的复选框
          this.img.splice(j, 1); //将图片数组中的数据也删除
          // store.state.list[j].select = false;      //删除之前将该位置的单选按钮改为false
          store.state.list.splice(j, 1);
        }
      }

      this.balance();
    },
    massDelet() {
      //删除选中（批量删除）
      console.log(this.single);

      for (var j = 0; j < store.state.list.length; j++) {
        if (store.state.list[j].select == true) {
          store.state.list.splice(j, 1);
          this.single.splice(j, 1);
          this.img.splice(j, 1);
          j--; //如果为true，则数组中的数据被清除一个，导致数组长度减一，所以j也要减一
        }
      }
      this.balance();
    },
    allselect() {
      //全选按钮
      this.allse1 = !this.allse1; //点击全选之后，将全选按钮的值取反

      for (var i = 0; i < store.state.list.length; i++) {
        store.state.list[i].select = this.allse1; //将全选按钮当前的状态与所有按钮同步
        this.single[i] = this.allse1;
      }

      this.balance();
    },
    select(a, index) {
      //单选按钮
      console.log(a);
      a.select = !a.select;
      this.single[index] = a.select;

      // store.state.list[index].select = a.select;
      var state = store.state.list.every(function(item) {
        //如果所有的select都为true，则全选按钮的属性为true，反之
        return item.select == true;
      });

      this.allse1 = state; //如果全选中，则将全选按钮的值设为true

      this.balance();
    }
  },
  beforeMount() {},
  mounted: function() {
    //当组件被创建为List添加select（是否选中字段，初始值为true）
    var count;
    count = store.state.list.length;
    for (var i = 0; i < count; i++) {
      this.single[i] = 0; //组件被创建，给复选框设初值
    }
    store.state.list.map(function(item, index) {
      item.select = false; //map:'键值对'
      // console.log(store.state.list)    //往item添加select属性，默认为true
    });
  },

  components: {
    HelloVuex
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>


