<template>
    <div class="col-12">
        <p class="small" v-if="user !== 'undefined'">{{ greet }}</p>
        <h2 class="font-h2">メニュー</h2>
        <ul>
            <li>イベントの管理</li>
            <li>コンサルタントプロフィール</li>
            <li>マイサロン</li>
            <li>アカウント情報</li>
            <li class="mt-1"><a href="javascript:void(0)" @click="signout" class="notice-link">サインアウト</a></li>
        </ul>
        <h2 class="font-h2">管理メニュー</h2>
        <ul>
            <li>お問い合わせ</li>
            <li>運営からのお知らせ</li>
            <li>
                <fa-icon :icon="['fab', 'instagram-square']" class="icon mr-2" />
                <fa-icon :icon="['fab', 'twitter']" color="#1DA1F2" class="icon " />
            </li>
        </ul>
    </div>
</template>
<script>
    import { getUser } from '@/scripts/user'
    import { signOut } from '@/scripts/auth'

    export default {
        name: 'MenuLeftBar',
        data() {
            return {
                user: new Map()
            }
        },
        computed: {
            userId: {
                get: function () {
                    return this.user.get('id')
                },
                set: function (newVal) {
                    this.user.set('id', newVal)
                }
            },
            userName: {
                get: function () {
                    return this.user.get('name')
                },
                set: function (newVal) {
                    this.user.set('name', newVal)
                }
            },
            greet: function () {
                var greet = ''
                let time = (new Date).getHours()
                switch(time){
                    case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10:
                        greet = 'おはようございます'
                        break
                    case 11: case 12: case 13: case 14: case 15: case 16: case 17:
                        greet = 'こんにちは'
                        break
                    case 18: case 19: case 20: case 21: case 22: case 23: case 0: case 1: case 2: 
                        greet = 'こんばんは'
                        break
                }
                return greet + '、' + this.userName + 'さん'
            }
        },
        methods: {
            signout: function () {
                signOut().then(() => {
                    this.$router.push('/').catch({})
                }).catch(e => {
                    console.log('Signount failed: ', e)
                    alert('サインアウト中にエラーが発生しました。時間を置いて再度お試しください。')
                })
            }
        },
        mounted() {
            this.user = getUser()
        }
    }
</script>
<style>
    li {
        list-style: none;
        margin-left: -1.5em;
    }

    .icon {
        font-size: 1.8em;
    }
</style>