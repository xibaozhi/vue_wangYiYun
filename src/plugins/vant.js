// 按需全局引入 vant组件
import Vue from 'vue'
import {List, Cell, Tabbar, TabbarItem,Swipe,Overlay,SwipeItem,
  Lazyload } from 'vant'
import { Search } from 'vant';
import { Tab, Tabs } from 'vant';
import 'vant/lib/index.css';
import { Progress } from 'vant';
import { Slider } from 'vant';
import { Toast } from 'vant';



Vue.use(Cell)
Vue.use(List)
Vue.use(Swipe)
Vue.use(Overlay)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Progress);
Vue.use(Slider);
Vue.use(Toast);