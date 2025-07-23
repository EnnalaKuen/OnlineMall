import { Button, Toast, Tabbar, TabbarItem, NavBar, Search, Swipe, SwipeItem, Grid, GridItem, Icon, Dialog, Lazyload, Rate, ActionSheet, Checkbox, Tab, Tabs } from 'vant'
import Vue from 'vue'

Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Checkbox)
Vue.use(ActionSheet)
Vue.use(Rate)
Vue.use(Lazyload)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
// 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。但是非组件内调用时，需要使用 Vue.prototype.$toast 来调用。
Vue.use(Toast)
