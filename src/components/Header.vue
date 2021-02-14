<template>
    <header class="stickey-top">
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex justify-content-between">
                    <div class="d-flex flex-column align-items-stretch">
                        <p class="small md-medium">イメージコンサルティングのイベント・サロン交流サイト</p>
                        <p><router-link to="/">Bouquet</router-link></p>
                        <img src="">
                    </div>
                    <div class="align-self-end">
                        <p><span class="cl-darkpink">▶︎</span><router-link :to="urlStr" class="notice-link">{{ loginStr }}</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    import firebase from '@/firebase/firestore'

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
        mounted() {
            firebase.auth().onAuthStateChanged(user => {
                this.auth = user? true: false
            })
        }
    }
</script>
<style scoped>
    header p {
        white-space: nowrap;
    }
</style>