<template>
 <section>
    <div class="card m-3">
      <h4 class="card-header">Tasks</h4>
      <div class="card-body">
      <label for="task" class="input-group d-flex">
        <div class="input-group m-1" v-for="task in tasks" :key="task.id">
          <input
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
          <button
          @click.stop="useEditTask(task.id)"
          class="btn btn-dark"
          type="button">
          Edit
          </button>
          <button
          @click.prevent="useDeleteTask(task.id)"
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
    // useEditTask() {
    //   this.readOnly = !this.readOnly;
    //   this.disabled = !this.disabled;
    //   this.newEditedTitle = this.editTask(this.newEditedTitle);
    // },
    useToggleTask(isComplete, id) {
      this.toggleTask(isComplete, id);
    },
  },
  mounted() {
    this.fetchTasks(this.tasks);
  },
};
</script>
