<template>
  <form
      @submit.prevent="addNewItem()"
  >
    <input type="text" v-model="newItem">
    <button type="submit">
      Add
    </button>
  </form>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      newItem: ''
    }
  },
  methods: {
    addNewItem() {
      if (this.newItem.trim()) {
        const newTodo = {
          title: this.newItem,
          datetime: new Date().toJSON(),
          completed: false
        }
        fetch('https://todo-app-idm-default-rtdb.europe-west1.firebasedatabase.app/todo.json',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTodo),
          cache: 'no-cache',
          redirect: 'follow'
        })
            .then(response => response.json())
            .then(json => {
              if (json.name) {
                newTodo.id = json.name
                this.$emit('add-todo', newTodo)
                this.newItem = ''
              }
            })
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
}

button {

}

</style>