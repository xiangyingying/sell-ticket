import Vue from 'vue'
import axios from 'axios'
import Vant from 'vant'
import { Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import {Loading} from 'vant'
import { IndexBar, IndexAnchor } from 'vant';
import ListItem from '@/components/ListItem.vue'
Vue.use(Lazyload);
Vue.use(Swipe).use(SwipeItem);
Vue.use(IndexBar).use(IndexAnchor);
Vue.use(Loading)
Vue.use(Vant)
Vue.component("ListItem",ListItem)
Vue.prototype.axios=axios
axios.defaults.baseURL='https://douban-api.now.sh/v2'
export default Vue