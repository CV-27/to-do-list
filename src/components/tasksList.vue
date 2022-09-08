<template>
 <section>
    <div class="card m-3">
      <h4 class="card-header">Tasks</h4>
      <div class="card-body">
      <!-- <ul class="list-group">
        <li
        class="list-group-item list-group-item-action"
        v-for="task in tasks"
        :key="task">
        {{ task.title }}
        </li>
      </ul> -->
      <label for="task">
        <input
        class="form-control m-2"
        v-for="task in tasks"
        :key="task"
        type="text"
        :value="task.title"
        disabled readonly>
      </label>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import useTasksStore from '@/store/modules/task';
import inputField from '@/components/inputField.vue';

export default {
  name: 'taskList',
  computed: {
    ...mapState(useTasksStore, [
      'tasks']),
  },
  methods: {
    ...mapActions(useTasksStore, [
      'fetchTasks',
      'deleteTask',
      'addTask',
    ]),
    ...mapActions(inputField, [
      'addNewTask',
    ]),
  },
};

</script>
