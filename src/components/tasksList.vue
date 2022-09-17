<template>
 <section>
    <div class="card m-3">
      <h4 class="card-header">Tasks</h4>
      <div class="card-body">
      <label for="task" class="input-group d-flex">
        <div class="input-group mb-2" v-for="task in tasks" :key="task.id">
          <!-- <input
          class="form-check-input m-2 "
          type="checkbox" value=""
          aria-label="Checkbox for following text input"> -->
          <input
          :class="[task.is_complete ? 'toggledTask' : '']"
          class="form-control"
          type="text"
          :value="task.title"
          :disabled = "disabled"
          :readonly = "readOnly">
          <button
          @click="useToggleTask(!task.is_complete, task.id)"
          class="btn btn-success"
          type="button"
          aria-describedby="button-addon3">
          Done
          </button>
          <!-- <button
          @click.stop="useEditTask(task.title, task.id)"
          class="btn btn-dark"
          type="button">
          Edit
          </button> -->
          <button
          @click.prevent="useDeleteTask(task.id)"
          class="btn btn-danger"
          type="button">
          Delete
          </button>
        </div>
      </label>
      <button
          @click.stop="useEditTask(tasks.title, tasks.id)"
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
import userStore from '@/store/modules/user';

export default {
  name: 'taskList',
  data() {
    return {
      readOnly: true,
      disabled: true,
      newEditedTitle: '',
    };
  },
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
      'editTask',
      'toggleTask',
    ]),
    useDeleteTask(id) {
      this.deleteTask(id);
    },
    useEditTask(title, id) {
      this.readOnly = !this.readOnly;
      this.disabled = !this.disabled;
      this.newEditedTitle = title;
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
