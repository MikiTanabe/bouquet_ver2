<template>
    <header class="stickey-top">
        <div class="container">
            <div class="col-12 d-flex content-items-center">
                <div>
                    <p>イメージコンサルティングのイベント・サロン交流サイト Bouquet</p>
                    <img src="">
                </div>
                <div>
                    <p><span class="cl-darkpink">▶︎</span><router-link to="mypage">{{ login-str }}</router-link></p>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        name: 'Header',
        computed: {
            loginStr: function () {
                if(1) {
                    return 'ログイン／新規登録'
                } else {
                    return 'マイページ'
                }
            },
            urlStr: function () {
                if(1) {
                    return 'signin'
                } else {
                    return 'home'
                }
            }
        }
    }
</script>
<style scoped>
</style>