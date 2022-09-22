<template>
 <section>
    <div class="card m-3">
      <h4 class="card-header">Tasks</h4>
      <div class="card-body">
      <label for="task" class="input-group d-flex">
        <div class="input-group mb-2" v-for="task in tasks" :key="task.id">
          <input
          @change="useEditTask(task.title, task.id)"
          :class="[task.is_complete ? 'toggledTask' : '']"
          class="form-control"
          type="text"
          v-model="task.title"
          :disabled = "disabled"
          :readonly = "readOnly">
          <button
          @click="useToggleTask(!task.is_complete, task.id)"
          class="btn btn-success"
          type="button"
          aria-describedby="button-addon3">
          Done
          </button>
          <button
          @click.prevent="useDeleteTask(task.id)"
          class="btn btn-danger"
          type="button">
          Delete
          </button>
        </div>
      </label>
      <button
      @click="activateEditTask"
      class="btn btn-outline-secondary px-3 m-1 float-end"
      type="button">
        Edit Tasks
      </button>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import useTasksStore from '@/store/modules/task';
import defineStore from '@/store/modules/user';

export default {
  name: 'taskList',
  data() {
    return {
      readOnly: true,
      disabled: true,
    };
  },
  computed: {
    ...mapState(useTasksStore, [
      'tasks']),
    ...mapState(defineStore, [
      'user',
    ]),
  },
  methods: {
    ...mapActions(useTasksStore, [
      'fetchTasks',
      'deleteTask',
      'editTask',
      'toggleTask',
    ]),
    useDeleteTask(id) {
      this.deleteTask(id);
    },
    activateEditTask() {
      this.readOnly = !this.readOnly;
      this.disabled = !this.disabled;
    },
    useEditTask(title, id) {
      this.editTask(title, id);
    },
    useToggleTask(isComplete, id) {
      this.toggleTask(isComplete, id);
    },
  },
  mounted() {
    this.fetchTasks(this.tasks);
  },
};
</script>
<style scoped>
.toggledTask {
  text-decoration: line-through;
  background-color: rgb(183, 194, 184);
  transition: background-color 1s, transform 1s;
  color:green;
}
</style>
