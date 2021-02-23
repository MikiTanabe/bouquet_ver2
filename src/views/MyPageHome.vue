<template>
    <div class="row">
        <div class="col-12">
            <h2>マイページトップ</h2>
            <information-bar />
            <h3 class="mt-4">参加予定のイベント</h3>
            <join-event-list />
            <h3 class="mt-4">主催イベント</h3>
            <hold-event-list />
            <!-- サロンパネル作成、設置 <salon-info-panel /> -->
        </div>
    </div>
</template>
<script>
    import InformationBar from '@/components/InformationBar.vue'
    import JoinEventList from '@/components/JoinEventList.vue'
    import HoldEventList from '@/components/HoldEventList.vue'

    export default {
        name: 'MyPageHome',
        components: {
            InformationBar,
            JoinEventList,
            HoldEventList
        }
    }
</script>