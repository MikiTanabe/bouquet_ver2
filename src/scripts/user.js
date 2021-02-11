import { auth } from '@/firebase/firestore.js'

export function getuser () {
    let mapUser = new Map()
    console.log('ファイアベースオーセンティケイション: ', auth.currentUser)
    if (auth.currentUser.uid) {
        mapUser.set('id', auth.currentUser.uid)
        mapUser.set('name', auth.currentUser.displayName)
    }
    return mapUser
}