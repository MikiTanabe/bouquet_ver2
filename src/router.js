import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import MyPage from '@/views/MyPage.vue'
import MyPageHome from '@/views/MyPageHome.vue'
import EventTop from '@/views/EventTop.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn,
            props: true
        },
        {
            path: '/mypage',
            name: 'MyPage',
            component: MyPage,
            props: true,
            children: [
                {
                    path: 'eventtop',
                    name: 'EventTop',
                    component: EventTop,
                    props: true
                },
                {
                    path: 'mypagehome',
                    name: 'MyPageHome',
                    component: MyPageHome,
                    props: true
                }
            ]
        }
    ]
})