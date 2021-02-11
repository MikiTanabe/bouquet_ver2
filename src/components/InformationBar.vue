<template>
    <div class="col-6">
        <div class="info-box px-1">
            <p class="mb-n1 small">Information<fa-icon :icon="['fas', 'exclamation']" class="exclamation" /></p>
            <div>
                <p class="mb-n1">{{ message }}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'InformationBar',
        data() {
            return {
                message: 'お知らせはありません'
            }
        }
    }
</script>
<style scoped>
    .info-box {
        border-top: solid black 1px;
        border-bottom: solid black 1px;
        padding: 2px;
    }

    .exclamation {
        color: red;
        font-size: 0.8em;
        margin-left: 0.3em;
    }
</style>