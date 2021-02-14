<template>
    <div class="row">
        <div class="col-10">
            <div class="col-12">
                <!-- TODO: イメージURLを編集ページでupできるようにする <img :src="" class="img-fluid"> -->
            </div>
            <p class="col-10 catchphrase">{{ objSalonData.catchPhrase }}</p>
            <p class="col-10">{{ objSalonData.introduction }}</p>
            <div class="col-4 col-md-2 text-center mt-3">
                <p class="menu-title">MENU</p>
            </div>
            <p class="col-8 menu">{{ menuStr }}</p>
            <div class="d-flex align-items-center justify-content-start">
                <p class="name mt-3">{{ objSalonData.name }}</p>
                <div class="area-box d-flex mt-n2 ml-2">
                    <p class="my-auto mx-2">{{ objSalonData.prefecture.name }} {{ objSalonData.subArea }}</p>
                </div>
                <p class="station ml-2 mt-3" v-if="stationStr!=''">最寄駅: {{ stationStr }}駅</p>
            </div>
            <div>
                <p>予約方法: {{ objSalonData.booking }}</p>
                <p>オーナー: {{ ornerName }}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import { db } from '@/firebase/firestore'
    import { generateMenuStr } from '@/scripts/functions'

    export default {
        name: 'SalonPage',
        data() {
            return {
                objConsultantData: () => {}
            }
        },
        props: {
            prObjSalon: {
                type: Object,
                default: () => {},
                validator(val){
                    return val === 'undefined'? false: true
                }
            }
        },
        computed: {
            objSalonData: function () {
                return this.prObjSalon
            },
            menuStr: function () {
                return generateMenuStr(this.objSalonData.features)
            },
            stationStr: function () {
                if(this.objSalonData.station.slice(-1)=='駅'){
                    return this.objSalonData.station.slice(0, -1)
                } else {
                    return this.objSalonData.station
                }
            },
            ornerName: function () {
                return this.objConsultantData.consulName
            }
        },
        watch: {
            //TODO: 発火させる
            prObjSalon: async function(newVal) {
                this.objConsultantData = await this.getConsultantData(newVal.userID)
            }
        },
        methods: {
            getConsultantData: async function (uid) {
                return new Promise(resolve => {
                    console.log('コンサルタントデータを取得する　ID: ', uid)
                    const docRef = db.collection('consultants').where('uid', '==', uid)
                    docRef.get().then(docSnap => {
                        docSnap.forEach(doc => {
                            var consultantData = doc.data()
                            consultantData.id = doc.id
                            resolve(consultantData)
                        })
                    })
                })
            }
        }
    }
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Kosugi&display=swap');

    .name {
        color: #999999;
        font-family: 'Kosugi', sans-serif;
        font-size: 2em;
    }

    .catchphrase {
        font-size: 1.5em;
        color: #845d9e;
    }

    .menu-title {
        background-color: #afafaf;
        color: white;
        font-size: 1.3em;
        font-family: 'Caveat', sans-serif;
    }

    .menu {
        font-size: 0.9em;
    }

    .area-box {
        border: solid 1px black;
    }

    .area-box p {
        font-size: 0.8em;
    }

    .station {
        font-size: 0.8em;
    }
</style>