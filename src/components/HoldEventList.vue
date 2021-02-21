<template>
    <div>
        <table class="table-sm table-palepink col-12 col-md-10">
            <thead>
                <tr>
                    <th class="title-title">イベント名</th>
                    <th class="title-date">開催日</th>
                    <th class="title-caption">キャプション</th>
                    <th class="title-edit">編集／削除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in arrHoldEvents" :key="event.id">
                    <td><p>{{ event.title }}</p></td>
                    <td><p class="text-nowrap">{{ event.dateStr }}</p></td>
                    <td><p class="caption">{{ event.introduction }}</p></td>
                    <td><p class="d-flex align-items-center justify-content-center"><a href="javascript:void(0)" @click="editClick(event.id)" class="d-inline-block"><fa-icon :icon="['fas', 'edit']" size="lg" /></a></p></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { getUser } from '@/scripts/user'
import { formatDate } from '@/scripts/functions'

export default {
    name: 'HoldEventList',
    data() {
        return {
            arrHoldEvents: () => {[]}
        }
    },
    methods: {
        getHoldEvents: async function () {
            return new Promise((resolve, reject) => {
                const docRef = db.collection('events')
                let query = docRef.where('uid', '==', getUser().get('id'))
                query.get().then(docSnap => {
                    var arrEvents = []
                    docSnap.forEach(doc => {
                        if(doc.data().date.toDate() < new Date()){
                            return
                        }
                        var objData = doc.data()
                        objData.id = doc.id
                        objData.dateStr = formatDate(objData.date.toDate(), '-')
                        arrEvents.push(objData)
                    })
                    arrEvents.sort((first, second) => {
                        if(first.date > second.date){
                            return 1
                        } else if(first.date < second.date) {
                            return -1
                        } else {
                            return 0
                        }
                    })
                    resolve(arrEvents)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        editClick: function (evId) {
            let objLink = {
                name: 'EventEdit',
                params: {
                    prEvId: evId
                }
            }
            this.$router.push(objLink).catch(() => {
                alert('エラーが発生しました。トップページに戻ります。')
                this.$router.push('/')
            })
            //TODO: イベント編集ページ作成
        }
    },
    async mounted() {
        let array = await this.getHoldEvents()
        this.arrHoldEvents = array.concat()
    }
}
</script>
<style scoped>
    .caption {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 8em;
    }

    .title-title {
        width: 30%;
    }

    .title-date  p {
        white-space: nowrap;
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