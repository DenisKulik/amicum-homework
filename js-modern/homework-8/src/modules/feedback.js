Vue.component('feedback', {
    template: `
    <footer>
      <form id="feedback-form" @submit.prevent="submitForm">
        <form id="feedback-form" @submit.prevent="submitForm">
        <div>
          <label for="name">Имя:</label>
          <input v-model="name" type="text" id="name" name="name" required />
        </div>
        <div>
          <label for="phone">Телефон:</label>
          <input v-model="phone" type="tel" id="phone" name="phone" required />
        </div>
        <div>
          <label for="email">E-mail:</label>
          <input v-model="email" type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="text">Текст:</label>
          <textarea id="text" v-model="textarea" name="text"></textarea>
        </div>
        <button type="submit">Отправить</button>
      </form>
      </form>
    </footer>
  `,
    methods: {
        submitForm() {
            this.$emit('submit-form')
        },
    },
})