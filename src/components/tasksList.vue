<template>
 <section>
    <div class="card m-3 d-flex">
      <h2 class="card-header">Tasks
        <span v-if="tasks.length"
        class="badge bg-warning font-monospace text-dark float-end"
        :showNmbTasks="showNmbTasks()"
        :showCompleteTasks="showCompleteTasks()">
        {{ completedTasks }} of {{ nmbTasks }} completed
        </span>
      </h2>
      <div class="card-body">
        <label for="task" class="input-group d-grid">
        <p
        class="alert alert-primary "
        role="alert"
        v-if="!tasks.length"> Enter a new task to begin
        </p>
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
            type="button"
            >
            Delete
            </button>
          </div>
      </label>
      <button
      @click="activateEditTask"
      :class="[!tasks.length ? 'hideBtn' : '']"
      class="btn btn-outline-secondary px-3 m-1 float-end"
      type="button"> {{ editBtn }} </button>
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
      nmbTasks: 0,
      completedTasks: 0,
      editBtn: 'Edit tasks',
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
      if (this.readOnly) {
        this.editBtn = 'Edit tasks';
      } else {
        this.editBtn = 'Summit';
      }
    },
    useEditTask(title, id) {
      this.editTask(title, id);
    },
    useToggleTask(isComplete, id) {
      this.toggleTask(isComplete, id);
    },
    showNmbTasks() {
      this.nmbTasks = this.tasks.length;
    },
    showCompleteTasks() {
      const completed = this.tasks.filter((item) => item.is_complete);
      this.completedTasks = completed.length;
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
.hideBtn {
  display: none;
}
</style>
