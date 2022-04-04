<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-text-field
          v-model="textInput"
          label="Text Here"
          required
        ></v-text-field>
        <v-card-actions>
          <v-btn color="primary" @click="addNewMessage()">Add</v-btn>
        </v-card-actions>

        <v-alert
          v-for="message in messages"
          :key="message.text"
          border="right"
          color="blue-grey"
          dark
        >
          {{ message.text }}
        </v-alert>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      textInput: '',
      messages: [],
    }
  },

  async created() {
    await this.$fire.firestore.collection('messages').onSnapshot((data) => {
      this.messages = [];
      data.docs.forEach((doc) => this.messages.push(doc.data()))
    })
  },

  methods: {
    async addNewMessage() {
      const functions = this.$fire.functions
      const insertMessage = functions.httpsCallable('insertMessage')
      await insertMessage({ text: this.textInput })
      this.textInput = ''
    },
  },
}
</script>
