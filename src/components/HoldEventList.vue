<template>
    <div class="col-12">
        <table class="table-sm table-palepink">
            <thead>
                <tr><th>イベント名</th>
                    <th>開催日</th>
                    <th>キャプション</ht></tr>
            </thead>
            <tbody>
                <tr v-for="event in arrHoldEvents" :key="event.id">
                    <td>{{ event.title }}</td>
                    <td>{{ event.dateStr }}</td>
                    <td>{{ event.introduction }}</td>
            </tbody>
        </table>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { getUser } from '@/scripts/user'

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
                let query = query.where('uid', '==', getUser())
                query.get().then(docSnap => {
                    var arrEvents = []
                    docSnap.forEach(doc => {
                        var objData = doc.data()
                        objData.id = doc.id
                        arrEvents.push(objData)
                    })
                    resolve(arrEvents)
                }).catch(e => {
                    reject(e)
                })
            })
        },
    },
    mounted() {
        this.arrHoldEvents = await this.getHoldEvents().concat()
    }
}
</script>