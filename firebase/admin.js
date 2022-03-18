import * as admin from 'firebase-admin'
import serviceAccount from './firebaseCredentials.json'

!admin.apps.length && admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://devter-2b0d3.firebaseio.com'
})

const firestoreDB = admin.firestore()

export { firestoreDB }