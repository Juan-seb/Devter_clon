import { firestoreDB } from "@fbs/admin.js"

const getDevit = async (request, response) => {
  const { query } = request
  const { id } = query

  await firestoreDB
    .collection('devits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      response.setHeader('Content-Type','application/json')
      response.send(JSON.stringify({
        ...data,
        createdAt: +data?.createdAt.toDate(),
        time: data?.createdAt.toDate().toLocaleString(),
        id: doc.id
      }))

    }).catch(() => {
      response.status(404).end()
    })

}

export default getDevit