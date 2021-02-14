<template>
    <div class="col-12">
        <h2>マイページトップ</h2>
        <information-bar />
        <h3 class="mt-4">参加予定のイベント</h3>
        <join-event-list />
    </div>
</template>
<script>
    import InformationBar from '@/components/InformationBar.vue'
    import JoinEventList from '@/components/JoinEventList.vue'

    export default {
        name: 'MyPageHome',
        components: {
            InformationBar,
            JoinEventList
        }
    }
</script>