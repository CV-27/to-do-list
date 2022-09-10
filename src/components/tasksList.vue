<template>
 <section>
    <div class="card m-3">
      <h4 class="card-header">Tasks</h4>
      <div class="card-body">
      <label for="task" class="input-group d-flex">
        <div class="input-group m-1" v-for="task in tasks" :key="task">
          <input
          class="form-control"
          type="text"
          :value="task.title"
          disabled readonly>
          <button
          class="btn btn-success"
          type="button"
          aria-describedby="button-addon3">
          Done
          </button>
          <button
          class="btn btn-dark"
          type="button">
          Edit
          </button>
          <button
          @click.prevent="useDeleteTask"
          class="btn btn-danger"
          type="button">
          Delete
          </button>
        </div>
      </label>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import useTasksStore from '@/store/modules/task';
import userStore from '@/store/modules/user';

export default {
  name: 'taskList',
  computed: {
    ...mapState(useTasksStore, [
      'tasks']),
    ...mapState(userStore, [
      'user',
    ]),
  },
  methods: {
    ...mapActions(useTasksStore, [
      'fetchTasks',
      'deleteTask',
      'addTask',
    ]),
    useDeleteTask() {
      this.deleteTask(this.id);
    },
  },
  mounted() {
    this.fetchTasks(this.tasks);
  },
};
</script>
