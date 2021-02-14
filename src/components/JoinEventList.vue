<template>
    <div>
        <table class="table-sm table-palepink col-12 col-md-10">
            <thead>
                <tr>
                    <th class="title-title">イベント名</th>
                    <th class="title-date">開催日</th>
                    <th class="d-none d-md-table-cell title-caption">キャプション</th>
                    <th class="title-host">主催者</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in arrEvents" :key="event.id">
                    <td><a href="javascript:void(0)" @click="titleClick(event.id)" class="notice-link">{{ event.title }}</a></td>
                    <td><p class="text-nowrap">{{ event.date }}</p></td>
                    <td class="d-none d-md-table-cell"><p class="caption">{{ event.introduction }}</p></td>
                    <td>{{ event.hostName }} <span v-if="event.hostSalon!=''&&event.hostSalon!=='undefined'">/ {{ event.hostSalon }}</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { db } from '@/firebase/firestore'
    import { getUser } from '@/scripts/user'
    import { formatDate, sortObjectArrayTS } from '@/scripts/functions'

    export default {
        name: 'JoinEventList',
        data() {
            return {
                uid: getUser().get('id'),
                arrEvents: () => {[]}
            }
        },
        methods: {
            getJoinEvents: async function () {
                return new Promise(resolve => {
                    const docRef = db.collection('events')
                    var arrEvents = new Array()
                    docRef.where("join", "array-contains", this.uid).get().then(docSnap => {
                        docSnap.forEach(doc => {
                            if(doc.get('date').toDate() <= new Date()){
                                return
                            }
                            let objEvent = {
                                id: doc.id,
                                title: doc.get('title'),
                                date: formatDate ( doc.get('date').toDate(), '-' ),
                                timestamp: doc.get('date'),
                                introduction: doc.get('introduction'),
                                hostName: doc.get('consultantName'),
                                hostSalon: doc.get('salonName')
                            }
                            arrEvents.push(objEvent)
                        })
                        resolve(arrEvents)
                    })
                })
            },
            setEventsList: async function() {
                let arrEvents = await this.getJoinEvents()
                this.arrEvents = sortObjectArrayTS(arrEvents)
            },
            titleClick: function (evid) {
                let objLink = {
                    name: 'EventPageCh',
                    params: {
                        prEvid: evid
                    }
                }
                this.$router.push(objLink).catch({})
            }
        },
        created() {
            this.setEventsList()
        },
        mounted() {
            this.uid = getUser().get('id')
        }
    }
</script>
<style scoped>
    .caption {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .title-title {
        width: 30%
    }

    @media screen and (min-width:768px){
        .caption {
            width: 15em;
        }
    }

    @media screen and (min-width:992px){
        .caption {
            width: 25em;
        }
    }
</style>