<template>
    <div class="col-12">
        <h2>マイページトップ</h2>
        <information-bar />
    </div>
</template>
<script>
    import InformationBar from '@/components/InformationBar.vue'

    export default {
        name: 'MyPageHome',
        components: {
            InformationBar
        }
    }
</script>