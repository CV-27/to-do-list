<template>
  <div class="block-content-box">
  <taskList />
  </div>
</template>

<script>

import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/modules/task';
import taskList from '@/components/tasksList.vue';

export default {
  name: 'HomeView',
  components: {
    taskList,
  },
  computed: {
    ...mapState(taskStore, ['tasks']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks']),
  },
  created() {
    this.fetchTasks();
  },
};
</script>
