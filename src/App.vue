<template>
  <div id="app">
    <h1>Todo application</h1>
    <add-todo
        @add-todo="addTodo"
    ></add-todo>
    <hr>
    <todo-list
        v-bind:todos="todos"
        @remove-todo="removeTodo"
    >
    </todo-list>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList"
import AddTodo from "@/components/AddTodo"

export default {
  name: 'App',
  data() {
    return {
      todos: []
    }
  },
  mounted() {
    fetch('https://todo-app-idm-default-rtdb.europe-west1.firebasedatabase.app/todo.json')
        .then(response => response.json())
        .then(json => {
         return  Object.entries(json)
             .map(el=> ({id: el[0], ...el[1]}))
        })
    .then (arr => this.todos = arr)
  },
  components: {
    TodoList,
    AddTodo
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
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
