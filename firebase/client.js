import { data } from 'autoprefixer';
import { getApps, initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { getFirestore, addDoc, collection, Timestamp, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD71qMQ0Ok_7XzR9T760-P8jShug05KPxo",
  authDomain: "devter-2b0d3.firebaseapp.com",
  projectId: "devter-2b0d3",
  storageBucket: "devter-2b0d3.appspot.com",
  messagingSenderId: "400874409815",
  appId: "1:400874409815:web:e6851f4666d4c0fdc8b812",
  measurementId: "G-9SEM8GD3JX"
};

// Avoid initialize other apps of firebase with the default name
!getApps.length && initializeApp(firebaseConfig);

const db = getFirestore()
const provider = new GithubAuthProvider()
const auth = getAuth()

const stateAuth = async (onChange) => {

  try {

    // The method is called every time when the component is initialized or the auth state changes.
    await auth.onAuthStateChanged(user => {
      if (user) {

        // the value of the useState is the entire user object, not just providerData
        onChange(user)

      } else {
        onChange(null)
      }
    })

  } catch (error) {
    console.log(error)
  }

}

// signInWithPopup its connected to onAuthStateChanged for this reason its not necesary to return the user in this method
const loginWithGitHub = async () => {

  try {

    // With onAuthStateChanged method avoid return the data in the login
    await signInWithPopup(auth, provider)

  } catch (error) {
    console.log(error)
  }

}

// Insert a new devit in the db
const addDevit = async ({ avatar, content, userName, userID, imagesData }) => {

  try {
    const ref = await addDoc(collection(db, 'devits'), {
      userID,
      userName,
      content,
      avatar,
      imagesData,
      createdAt: Timestamp.fromDate(new Date),
      likesCount: 0,
      sharedCount: 0
    })

    return ref
  } catch (error) {
    console.log(error)
  }

}

// Maping the data to the devits
const mapDevitsData = (doc) => {
  let data = doc.data()

  // It´s necesary to convert timestamp to date and next to string
  return {
    ...data,
    // toLocaleString() show only the date and the hour that the devit was created
    /*  createdAt: data?.createdAt.toDate().toLocaleString(), */
    createdAt: +data?.createdAt.toDate(),
    id: doc.id,
    time: data?.createdAt.toDate().toLocaleString()
  }
}

// Get all the devits in the collection and return to render in the page home
const getDevits = async () => {

  const refDevits = collection(db, 'devits')
  const devitsSnapshot = await getDocs(query(refDevits, orderBy('createdAt', 'desc')))


  return devitsSnapshot.docs.map(mapDevitsData)
}

const listenDevits = async (callback) => {

  const refDevits = collection(db, 'devits')
  const q = query(refDevits, orderBy('createdAt', 'desc'), limit(10))

  // Initialize an observer in the database for the new devits
  const devitsSnapshot = await onSnapshot(q, ({ docs }) => {

    // Every time that and user add a devit this function is executed
    const devits = docs.map(mapDevitsData)
    callback(devits)
  })
  
  return devitsSnapshot
}

const uploadImages = (file) => {

  const storage = getStorage()
  const refStorage = ref(storage, `images/${file.name}`)
  const uploadTask = uploadBytesResumable(refStorage, file)

  return uploadTask

}



export { loginWithGitHub, stateAuth, addDevit, getDevits, listenDevits, uploadImages }