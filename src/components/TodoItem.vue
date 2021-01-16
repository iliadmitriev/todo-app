<template>
  <li>
    <span v-bind:class="{done: todo.completed}">
      <input type="checkbox" v-model="todo.completed">
      <strong>
        {{ todo.id }}
      </strong>
    {{ todo.title }}
      <span>{{ todo.datetime | date }}</span>
    </span>
    <button
        class="rm"
        @click="$emit('remove-todo', todo.id)"
    >
      &times;
    </button>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
li {
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  padding: .5rem 2rem;
  margin-bottom: 1rem;
}

.rm {
  background: red;
  color: #fff;
  border-radius: 50%;
  font-weight: bold;
}

.done {
  text-decoration: line-through;
}

input {
  margin-right: 1rem;
}

</style>