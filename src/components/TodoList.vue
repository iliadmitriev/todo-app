<template>
  <div>
    <ul>
      <todo-item
          v-for="(todo, i) in todos"
          :todo="todo"
          :pos="i + 1"
          @remove-todo="removeTodo"
          @update-todo="updateTodo"
      >
      </todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";

export default {
  name: "TodoList",
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  components: {
    TodoItem
  },
  methods: {
    removeTodo(id) {
      this.$emit('remove-todo', id)
    },
    updateTodo(todo) {
      this.$emit('update-todo', todo)
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>