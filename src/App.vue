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
      todos: [
        {id: 1, title: 'Купить хлеб', datetime: (new Date()).toLocaleString(), completed: false},
        {id: 2, title: 'Купить масло', datetime: (new Date()).toLocaleString(), completed: false},
        {id: 3, title: 'Купить пельмени', datetime: (new Date()).toLocaleString(), completed: false},
      ]
    }
  },
  components: {
    TodoList,
    AddTodo
  },
  methods: {
    addTodo(todo) {
      this.todos.unshift(todo)
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
