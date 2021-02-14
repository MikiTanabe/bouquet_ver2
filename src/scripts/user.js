import firebase from '@/firebase/firestore.js'

export function getUser () {
    var mapUser = new Map()
    const user = firebase.auth().currentUser
    if (user) {
        mapUser.set('id', user.uid)
        //console.log(user.displayName)
        mapUser.set('name', user.displayName)
    }
    return mapUser
}