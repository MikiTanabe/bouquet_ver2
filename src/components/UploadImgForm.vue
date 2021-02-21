<template>
    <div class="form-group">
        <label>
            <p>イメージ画像(最大サイズ: {{ imgSizeStr }}MB) ファイルタイプ: .jpeg/.png</p>
            <img :src="prevImgUrl" class="img-fluid mb-1">
            <input type="file" id="img" ref="file" @change="imgSelected">
            <p class="errorMsg">{{ imgErrorMsg }}</p>
        </label>
    </div>
</template>
<script>
    import { checkFile, getBase64, uploadEventImage, storageNumbers } from '@/scripts/picture'

    const IMG_SIZE = 1000000

    export default {
        name: 'UploadImgForm',
        data() {
            return {
                imgErrorMsg: '',
                prevImgUrl: '',
                imgSizeStr: IMG_SIZE/ 1000000,
                imgFile: null
            }
        },
        props: {
            prNumStorage: {
                type: Number,
                default: storageNumbers.DEFAULT,
                validator: val => {
                    var check = false
                    Object.keys(storageNumbers).forEach(key => {
                        if(storageNumbers[key] == val){
                            check = true
                            return
                        }
                    })
                    return check
                }
            },
            id: {
                type: String,
                default: '',
                validator(val) {
                    return val == '' || val === 'undefined'? false: true
                }
            },
            preview: {
                type: String,
                default: ''
            }
        },
        methods: {
            imgSelected: async function (event) {
                const files = event.target.files || event.dataTransfer.files
                const file = files[0]
                this.imgFile = file
                let checked = checkFile(file, IMG_SIZE)
                if(checked.result){
                    const picture = await getBase64(file)
                    this.prevImgUrl = picture
                } else {
                    this.imgErrorMsg = checked.errorMsg
                }
            },
            uploadImg: async function () {
                switch(this.prNumStorage) {
                    case storageNumbers.EVENT: {
                        let imgUrl = await uploadEventImage(this.id, this.imgFile)
                        this.$emit('uploaded', imgUrl)
                    }
                }
            }
        },
        created() {
            //TODO: 初回読み込み時プレビューを表示する
            this.prevImgUrl = this.preview
        }
    }
</script>