<template>
    <div>
        <!-- TODO: 検索ウィンドウ＆検索機能 -->
        <div class="col-12">
            <h3>{{ titleTxt }}</h3>
            <form>
                <div class="form-group">
                    <label class="col-12 col-md-10">
                        <p>イベント名</p>
                        <input type="text" id="title" class="form-control" placeholder="新規イベント" v-model="title">
                    </label>
                </div>
                <div class="form-group">
                    <label class="col-10">
                        <p>開催日</p>
                        <input type="date" id="date" class="form-control" v-model="date">
                    </label>
                </div>
                <upload-img-form :prNumStorage="numStorage" :id="evId" :preview="prevImgUrl" @uploaded="getImgUrl" />
                <div class="form-group">
                    <label class="col-10">
                        <p>案内文</p>
                        <textarea id="introduction" v-model="introduction" class="form-control"></textarea>
                    </label>
                </div>
                <div class="form-group">
                    <label class="col-10">
                        <p>イベントURL(Youtubeチャンネル、イベント告知ページ等)</p>
                        <input type="text" id="txt-url" class="form-control" v-model="txtUrl" placeholder="https://">
                    </label>
                </div>
                <div class="form-group">
                    <label class="col-10">
                        <p>参加者</p>
                        <select name="join" :size="arrGuests.length" class="form-control" multiple>
                            <option v-for="guest in arrGuests" :key="guest.id" :value="guest.id" :label="guest.name + ' / ' + guest.salonName"></option>
                        </select>
                        <div class="mt-1 d-flex">
                            <add-guest-window @click="getNewGuests"/>
                            <red-button @click="click" :disabled="true">招待取消</red-button>
                        </div>
                    </label>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import format from '@/scripts/eventsFormat.json'
import { formatDate, bqDateParse, copyObjectReactive } from '@/scripts/functions'
import UploadImgForm from '@/components/UploadImgForm'
import { storageNumbers } from '@/scripts/picture'
import RedButton from '@/components/RedButton'
//import BlueButton from '@/components/BlueButton'
import AddGuestWindow from '@/components/AddGuestWindow'

    export default {
        name: 'EventEdit',
        data() {
            return {
                objEventData: format,
                numStorage: storageNumbers.EVENT,
                arrGuests: new Array(),
                prevImgUrl: ''
            }
        },
        components: {
            UploadImgForm,
            RedButton,
            //BlueButton,
            AddGuestWindow
        },
        computed: {
            titleTxt: function () {
                return this.evId == 'sample'? 'イベントの新規作成': 'イベントの編集'
            },
            evId: function () {
                return this.prEvId
            },
            consultantName: {
                set: function (val) {
                    this.$set(this.objEventData, 'consultantName', val)
                },
                get: function () {
                    return this.objEventData.consultantName
                }
            },
            date: {
                set: function (val) {
                    this.objEventData.date = bqDateParse(val)
                },
                get: function () {
                    if(this.objEventData.date != '2021-01-01'){
                        return formatDate(this.objEventData.date.toDate(), '-')
                    } else {
                        return this.objEventData.date
                    }
                }
            },
            delete: {
                set: function (val) {
                    this.$set(this.objEventData, 'delete', val == ''? new Array(): val)
                },
                get: function () {
                    return this.objEventData.delete == ''? new Array(): this.objEventData.delete
                }
            },
            imgUrl: {
                set: function (val) {
                    this.$set(this.objEventData, 'imgUrl', val)
                },
                get: function () {
                    return this.objEventData.imgUrl
                }
            },
            introduction: {
                set: function (val) {
                    this.$set(this.objEventData, 'introduction', val)
                },
                get: function () {
                    return this.objEventData.introduction
                }
            },
            join: {
                set: function (val) {
                    this.$set(this.objEventData, 'join', val == ''? new Array(): val)
                },
                get: function () {
                    return this.objEventData.join == ''? new Array(): this.objEventData.join
                }
            },
            preJoin: {
                set: function (val) {
                    this.$set(this.objEventData, 'preJoin', val == ''? new Array(): val)
                },
                get: function () {
                    return this.objEventData.preJoin == ''? new Array(): this.objEventData.preJoin
                }
            },
            salonId: {
                set: function (val) {
                    this.$set(this.objEventData, 'salonId', val)
                },
                get: function () {
                    return this.objEventData.salonId
                }
            },
            salonName: {
                set: function (val) {
                    this.$set(this.objEventData, 'salonName', val)
                },
                get: function () {
                    return this.objEventData.salonName
                }
            },
            title: {
                set: function (val) {
                    this.$set(this.objEventData, 'salonName', val)
                },
                get: function () {
                    return this.objEventData.title
                }
            },
            txtUrl: {
                set: function (val) {
                    this.$set(this.objEventData, 'txtUrl', val)
                },
                get: function () {
                    return this.objEventData.txtUrl
                }
            },
            uid: {
                set: function (val) {
                    this.$set(this.objEventData, 'uid', val)
                },
                get: function () {
                    return this.objEventData.uid
                }
            },
            upDate: {
                set: function (val) {
                    this.$set(this.objEventData, 'upDate', val)
                },
                get: function () {
                    return this.objEventData.upDate
                }
            },
            dateStr: {
                set: function (val) {
                    this.objEventData.date = new Date(val)
                },
                get: function () {
                    return formatDate(this.objEventData.toDate(), '-')
                }
            }
        },
        props: {
            prEvId: {
                type: String,
                default: 'sample',
                validator(val) {
                   return (val == '' || val === 'undefined')? false: true
                }
            }
        },
        methods: {
            getEventData: async function () {
                return new Promise(resolve => {
                    const docRef = db.collection('events').doc(this.evId)
                    docRef.get().then(doc => {
                        if(doc.exists){
                            //this.objEventData = doc.data()
                            copyObjectReactive(doc.data(), this.objEventData, this)
                            this.prevImgUrl = doc.get('imgUrl')
                        }
                        resolve()
                    })
                })
            },
            getImgUrl: function (url) {
                this.imgUrl = url
            },
            saveClick: async function () {
                await this.$refs.child.$emit('uploadImg')
                //TODO: データを作るorアップデートする
                const docRef = db.collection('events')
                docRef.doc(this.evId).get().then(doc => {
                    if(doc.exists){
                        docRef.doc(this.evId).upDate(this.objEventData)
                    } else {
                        docRef.add(this.objEventData)
                    }
                }).catch(e => {
                    console.log('データの更新に失敗しました', e)
                    alert('イベントデータの' + this.evId != '' || this.evId !== 'undefined'? '更新': '追加' + 'に失敗しました')
                })
            },
            getGuestsName: async function () {
                const docRef = db.collection('consultants')
                for(let i = 0; i < this.join.length; i++){
                    let query = docRef.where('uid', '==', this.join[i])
                    await query.get().then(docSnap => {
                        docSnap.forEach(doc => {
                            let objGuest = {
                                id: doc.id,
                                name: doc.get('consulName'),
                                salonName: doc.get('salonName')
                            }
                            this.arrGuests.push(objGuest)
                        })
                    })
                }
            },
            click: function () {
                alert('ボタンクリック')
            },
            getNewGuests: function (val) {
                console.log('追加するゲスト: ', val)
            }
        },
        mounted: async function () {
            await this.getEventData()
            await this.getGuestsName()
        }
    }
</script>
<style scoped>
    #introduction {
        height: 10em;
    }

    @media screen and (min-width: 768px) {
        #introduction {
            height: 6em;
        }
    }

    @media screen and (min-width: 992px) {
        
    }

    label {
        margin-bottom: -0.1em;
    }

    label p {
        margin-bottom: -0.1em;
    }
</style>