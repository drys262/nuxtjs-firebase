const functions = require('firebase-functions')
const admin = require('firebase-admin')

const cors = require('cors')({ origin: true })
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
admin.initializeApp()

exports.insertMessage = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    functions.logger.info('Hello logs!', { structuredData: true })
    functions.logger.info(request.body, { structuredData: true })

    const {
      data: { text },
    } = request.body

    await admin.firestore().collection('messages').add({ text })

    response.status(200).send({ message: 'Success', data: {} })
  })
})
