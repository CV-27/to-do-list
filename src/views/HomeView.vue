<template>
  <div class="home">
  <h1>Home View</h1>
  </div>
</template>

<script>

import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/modules/task';

export default {
  name: 'HomeView',
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
