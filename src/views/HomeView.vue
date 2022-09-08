<template>
  <div class="block-content-box">
    <task-list />
    <input-field />
  </div>
</template>

<script>

import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/modules/task';
import taskList from '@/components/tasksList.vue';
import inputField from '@/components/inputField.vue';

export default {
  name: 'HomeView',
  components: {
    taskList,
    inputField,
  },
  computed: {
    ...mapState(taskStore, ['tasks']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'addTask']),
  },
  created() {
    this.fetchTasks();
  },
};
</script>
