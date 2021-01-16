<template>
  <div>
    <h2>Todo application</h2>
    <router-link to="/">Home</router-link>
    <add-todo
        @add-todo="addTodo"
    ></add-todo>
    <hr>
    <loader v-if="loading"></loader>
    <todo-list
        v-else-if="todos.length > 0"
        v-bind:todos="todos"
        @remove-todo="removeTodo"
        @update-todo="updateTodo"
    >
    </todo-list>
    <p v-else>Nothing here, Add new</p>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList"
import AddTodo from "@/components/AddTodo"
import Loader from "@/components/Loader"

export default {
  name: 'Todos',
  data() {
    return {
      todos: [],
      loading: true
    }
  },
  mounted() {
    fetch('https://todo-app-idm-default-rtdb.europe-west1.firebasedatabase.app/todo.json')
        .then(response => response.json())
        .then(json => {
          return Object.entries(json)
              .map(el => ({id: el[0], ...el[1]}))
        })
        .then(arr => {
          this.todos = arr
          this.loading = false
        })
  },
  components: {
    TodoList,
    AddTodo,
    Loader
  },
  methods: {
    addTodo(todo) {
      this.todos.push(todo)
    },
    removeTodo(id) {
      const idx = this.todos.findIndex(el => el.id === id)
      if (idx >= 0) {
        this.todos.splice(idx, 1)
      }
    },
    updateTodo(data) {
      fetch(`https://todo-app-idm-default-rtdb.europe-west1.firebasedatabase.app/todo/${data.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({completed: data.completed}),
        cache: 'no-cache',
        redirect: 'follow'
      })
    }
  }
}
</script>

<style scoped>

</style>