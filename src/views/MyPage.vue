<template>
    <div>
        <div class="mypage-container">
            <div class="medium-menubar d-none d-md-block">
                <menu-left-bar />
            </div>
            <div class="mypage-content">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
    import MenuLeftBar from '@/components/MenuLeftBar'

    export default {
        name: 'MyPage',
        components: {
            MenuLeftBar
        }
    }
</script>
<style scoped>
    .mypage-container {
        display: block;
        padding-top: 1em;
    }

    .medium-menubar {
        
    }

    .mypage-content {
        
    }

    @media screen and (min-width: 768px){
        .mypage-container {
            display: grid;
            grid-template-columns: 20em 100%;
            grid-template-rows: 100%;
        }
    }
</style>