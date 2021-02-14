import { auth } from '@/firebase/firestore'

export async function signOut() {
    return new Promise((resolve, reject) => {
        auth.signOut().then(() => {
            resolve()
        }).catch(e => {
            reject(e)
        })
    })
}