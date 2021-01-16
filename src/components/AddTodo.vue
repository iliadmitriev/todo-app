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
        const id = Math.random().toString(36).substring(1)
        const newTodo = {
          id: Date.now(),
          title: this.newItem,
          datetime: (new Date()).toLocaleString(),
          completed: false
        }
        this.$emit('add-todo', id, newTodo)
        this.newItem = ''
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