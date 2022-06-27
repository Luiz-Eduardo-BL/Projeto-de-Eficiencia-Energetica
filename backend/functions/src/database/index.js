import admin from 'firebase-admin'

import functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

const db = admin.firestore() //database

export default db