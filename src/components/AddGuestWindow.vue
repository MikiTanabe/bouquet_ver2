<template>
    <div>
        <blue-button :modal="true" :target="targetName">招待追加</blue-button>
        <modal-window :target="targetName" :btn2="true" :btn2Txt="'追加'" @click="click">
            <div class="content-wrapper">
                <label>
                    <p class="mb-n1">ユーザーを検索</p>
                    <input type="text" v-model="strSearch" placeholder="コンサルタント名、 サロン名など" id="keyword">
                    <blue-button @click="searchClick">検索</blue-button>
                </label>
                <!-- ztodo: 検索結果窓 -->
                <div class="user-list" v-if="arrUsers.length> 0">
                    <select :size="arrUsers.length" multiple v-model="arrNewGuest">
                        <option v-for="user in arrUsers" :key="user.id" :value="user.id"></option>
                    </select>
                </div>
                <p v-if="!booFound">該当するユーザーが存在しません。</p>
                <p v-if="hasError">ユーザーを検索中にエラーが発生しました。ウィンドウを閉じて再度お試しください。</p>
            </div>
        </modal-window>
    </div>
</template>
<script>
    import BlueButton from '@/components/BlueButton'
    import ModalWindow from '@/components/ModalWindow'
    import { db } from '@/firebase/firestore'
    import { whitespaceSplit } from '@/scripts/functions'

    export default {
        name: 'AddGuestWindow',
        components: {
            BlueButton,
            ModalWindow
        },
        data() {
            return {
                targetName: 'modal-guest',
                arrNewGuest: new Array(),
                strSearch: '',
                arrUsers: new Array(),
                booFound: true,
                hasError: false
            }
        },
        methods: {
            click: function () {
                this.$emit('click', this.arrNewGuest)
            },
            searchClick: function () {
                let arrayKeyWords = whitespaceSplit(this.strSearch)
                console.log('検索文字列: ', arrayKeyWords)
                const docRef = db.collection('consultants')
                const query = docRef.where('keyWords', 'array-contains-any', arrayKeyWords)
                query.get().then(docSnap => {
                    console.log(docSnap.docs.length)
                    var resultArray = new Array()
                    if(docSnap.docs.length > 0){
                        this.booFound = true
                        docSnap.forEach(doc => {
                            var objUser = {
                                name: doc.get('consulName'),
                                salonName: doc.get('salonName'),
                                id: doc.get('uid')
                            }
                            resultArray.push(objUser)
                        })
                        this.arrUsers = resultArray
                        this.hasError = false
                    } else {
                        this.booFound = false
                        this.arrUsers.splice(0)
                    }
                    
                }).catch(() => {
                    this.hasError = true
                })
            }
        }

    }
</script>
<style scoped>
    input#keyword {
        width: 15em;
        margin-right: 0.5em;
    }

    @media screen and (min-width: 768px){
        input#keyword {
            width: 20em;
        }
    }

</style>