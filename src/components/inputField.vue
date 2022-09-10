<template>
 <section>
    <div class="card m-3">
      <div class="card-body">
        <label for="task" class="input-group d-flex">
          <div class="input-group">
            <input
            v-model="newTitle"
            type="text"
            class="form-control"
            placeholder="Add a new task"
            aria-label="Add a new task"
            aria-describedby="button-addon2"
            required>
            <button
            @click="addNewTask"
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2">Add Task
            </button>
          </div>
        </label>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import userStore from '@/store/modules/user';
import useTasksStore from '@/store/modules/task';

export default {
  name: 'inputField',
  data() {
    return {
      newTitle: '',
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
      'addTask',
    ]),
    addNewTask() {
      this.addTask(this.newTitle, this.user.id);
      this.tasks.push({ title: this.newTitle, id: this.user.id });
      this.newTitle = '';
    },
  },
};

</script>
