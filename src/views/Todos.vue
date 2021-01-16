<template>
  <div>
    <h2>Todo application</h2>
    <router-link to="/">Home</router-link>
    <add-todo
        @add-todo="addTodo"
    ></add-todo>
    <hr>
    <select v-model="filter">
      <option value="all" selected>all</option>
      <option value="completed">completed</option>
      <option value="not-completed">not-completed</option>
    </select>
    <hr>
    <loader v-if="loading"></loader>
    <todo-list
        v-else-if="filteredTodos.length > 0"
        v-bind:todos="filteredTodos"
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
      loading: true,
      filter: 'all'
    }
  },
  mounted() {
    fetch('https://todo-app-idm-default-rtdb.europe-west1.firebasedatabase.app/todo.json')
        .then(response => response.json())
        .then(json => {
          return Object.entries(json)
              .map(el => ({id: el[0], ...el[1]}))
        }, () => [])
        .then(arr => {
          this.todos = arr
        })
        .finally(() => {
          this.loading = false
        })

  },
  components: {
    TodoList,
    AddTodo,
    Loader
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'completed') {
        return this.todos.filter(i => i.completed)
      } else if (this.filter === 'not-completed') {
        return this.todos.filter(i => !i.completed)
      } else {
        return this.todos
      }
    }
  },
  methods: {
    addTodo(todo) {
      fetch('https://todo-app-idm-default-rtdb.europe-west1.firebasedatabase.app/todo.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo),
        cache: 'no-cache',
        redirect: 'follow'
      })
          .then(response => response.json())
          .then(json => {
            if (json.name) {
              todo.id = json.name
              this.todos.push(todo)
            }
          })
    },
    removeTodo(id) {
      const idx = this.todos.findIndex(el => el.id === id)
      fetch(`https://todo-app-idm-default-rtdb.europe-west1.firebasedatabase.app/todo/${id}.json`, {
        method: 'DELETE',
        cache: 'no-cache',
        redirect: 'follow'
      })
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