<template>
  <li>
    <span v-bind:class="{done: todo.completed}">
      <label>
        <input
            type="checkbox"
            v-model="todo.completed"
            @change="$emit('update-todo', todo)"
        >
      </label>
      <strong>
        {{ pos }}
      </strong>
      {{ todo.title }}
      <span class="datetime">{{ todo.datetime | formatDate }}</span>
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
    },
    pos: {
      type: Number,
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

.datetime {
  font-size: 12px;
  color: #3e3e3e;
}

</style>