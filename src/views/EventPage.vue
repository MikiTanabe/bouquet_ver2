<template>
    <div class="row">
        <div class="col-12">
            <h3>{{ objEventData.title }}</h3>
            <div class="col-12 mt-3 d-flex flex-column align-items-center">
                <div class="col-5 d-flex">
                    <img :src="objEventData.imgUrl" class="img-fluid">
                </div>
                <div class="text-left col-12 mt-3 event-detail">
                    <p>{{ objEventData.introduction }}</p>
                </div>
            </div>
            <div class="col-12">
                <div class="col-5 col-md-3 col-lg-2 d-flex justify-content-center data-title-box">
                    <p class="my-auto">INFORMATION</p>
                </div>
                <div class="mt-1 data-box">
                    <table class="table-sm table-clear">
                        <tbody>
                            <tr><td>開催日: </td><td>{{ objEventData.date }}</td></tr>
                            <tr v-if="objEventData.txtUrl!='イベントURL'&&objEventData.txtUrl!=='undefined'"><td>イベントURL: </td><td>{{ objEventData.txtUrl }}</td></tr>
                            <tr><td>主催者: </td><td><a href="javascript:void(0)" @click="hostClick(objEventData.uid)" class="notice-link">{{ objEventData.consultantName }}</a><span v-if="objEventData.salonName!='サロン名'"> / {{ objEventData.salonName }}</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 mt-3">
                <h4 class="mb-3">参加者</h4>
                <guest-list :prGuestList="guestsList" />
            </div>
        </div>
    </div>
</template>
<script>
    import { db } from '@/firebase/firestore'
    import { formatDate } from '@/scripts/functions'
    import GuestList from '@/components/GuestList.vue'

    /* indexedDB設定
    const IDBKey = 'eventpage'
    const objectstore = 'bouquet'
    const defaultIDBData = {
        key: IDBKey,
        data: {}
    }
    */

    export default {
        name: 'EventPage',
        components: {
            GuestList
        },
        data() {
            return {
                objEventData: () => {[]}
            }
        },
        props: {
            prEvid: {
                type: String,
                default: ''
            }
        },
        computed: {
            evid: function () {
                return this.prEvid
            },
            guestsList: function () {
                return this.objEventData.join
            }
        },
        methods: {
            getEventData: async function () {
                return new Promise((resolve, reject) => {
                    if(this.evid==''){
                        reject()
                    }
                    const docRef = db.collection('events').doc(this.evid)
                    docRef.get().then(doc => {
                        if(doc.exists){
                            this.objEventData = doc.data()
                            this.objEventData.date = formatDate(this.objEventData.date.toDate(), '/')
                            resolve()
                        } else {
                            reject()
                        }
                    })
                })
            },
            hostClick: function (cid) {
                let objLink = {
                    name: 'ProfilePageCh',
                    params: {
                        prCid: cid
                    }
                }
                this.$router.push(objLink).catch({})
            }
        },
        mounted() {
            this.getEventData()
        },
        beforedestroy() {
            //TODO: indexedDB
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');

    h3 {
        color: black;
        border-bottom: 1px solid black;
        width: 80%;
    }

    h4 {
        color: black;
        font-size: 1.2em;
        font-family: 'M PLUS 1p'
    }

    .event-detail {
        color: black;
    }

    .data-box {
        border-left: 1px solid #d06da3;
    }

    .data-title-box {
        background-color: #d06da3;
    }

    .data-title-box p {
        color: white;
        font-family: 'Shadows Into Light', cursive;
        font-size: 1.2em;
    }

    @media screen and (min-width: 992px) {
        .data-title-box p {
            font-size: 1.5em;
        }
    }

    @media screen and (min-width: 576px) {
        .data-title-box p {
            font-size: 1.8em;
        }
    }
</style>