<template>
    <header class="fixed-top">
        <div class="row">
            <div class="col-12 col-md-10">
                <p class="small md-medium ml-1">イメージコンサルティングのイベント・サロン交流サイト</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-flex justify-content-center align-items-end">
                <div class="col-12 col-md-10 d-flex justify-content-between align-items-end">
                    <p><router-link to="/" active-class="active">Bouquet</router-link></p>
                    <p>
                        <span class="cl-darkpink">▶︎</span>
                        <router-link :to="urlStr" class="notice-link">{{ loginStr }}</router-link>
                        <span v-if="auth">／</span>
                        <a v-if="auth" href="javascript:void(0)" class="notice-link" @click="signout">サインアウト</a>
                    </p>
                    <!-- <img src=""> -->
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    //import firebase from '@/firebase/firestore'
    import { signOut, checkAuth } from '@/scripts/auth'

    export default {
        name: 'Header',
        data() {
            return {
                auth: false
            }
        },
        computed: {
            loginStr: function () {
                if(this.auth) {
                    return 'マイページ'
                } else {
                    return 'ログイン／新規登録'
                }
            },
            urlStr: function () {
                if(this.auth) {
                    return '/mypage/mypagehome'
                } else {
                    return '/signin'
                }
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
            /*
            firebase.auth().onAuthStateChanged(user => {
                this.auth = user? true: false
            })
            */
            this.auth = checkAuth()
        }
    }
</script>
<style scoped>
    header p {
        white-space: nowrap;
    }
</style>