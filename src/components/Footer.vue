<template>
    <footer class="d-md-none fixed-bottom" v-if="auth">
        フッター
    </footer>
</template>
<script>
    import { /* signOut,*/ checkAuth } from '@/scripts/auth'

    export default {
        data() {
            return {
                auth: false
            }
        },
        mounted() {
            this.auth = checkAuth()
            //TODO: 承認処理共通化出来るか確認
        }
    }
</script>
<style scoped>
</style>