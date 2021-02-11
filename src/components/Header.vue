<template>
    <header class="stickey-top">
        <div class="container">
            <div class="col-12 d-flex justify-content-between align-content-end">
                <div>
                    <p>イメージコンサルティングのイベント・サロン交流サイト Bouquet</p>
                    <img src="">
                </div>
                <div class="align-self-end">
                    <p><span class="cl-darkpink">▶︎</span><router-link :to="urlStr" class="notice-link">{{ loginStr }}</router-link></p>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        name: 'Header',
        props: {
            prAuth: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            auth: function () {
                return this.prAuth
            },
            loginStr: function () {
                if(!this.auth) {
                    return 'ログイン／新規登録'
                } else {
                    return 'マイページ'
                }
            },
            urlStr: function () {
                if(!this.auth) {
                    return '/signin'
                } else {
                    return '/mypage/mypagehome'
                }
            }
        }
    }
</script>
<style scoped>
</style>