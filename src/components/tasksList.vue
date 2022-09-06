<template>
 <section class='block-content-box'>
    <div class="card m-3">
      <h4 class="card-header">Tasks</h4>
      <div class="card-body">
      <li v-for="task in tasks" :key="task"> {{ task.title }}
      </li>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import useTasksStore from '@/store/modules/task';

export default {
  name: 'taskList',
  data() {
    return {
    };
  },
  computed: {
    ...mapState(useTasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(useTasksStore, [
      'fetchTasks',
    ]),
  },
};

</script>
