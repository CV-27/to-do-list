<template>
  <div class="block-content-box">
    <task-list />
    <input-field />
  </div>
</template>

<script>

import taskList from '@/components/tasksList.vue';
import inputField from '@/components/inputField.vue';

export default {
  name: 'HomeView',
  components: {
    taskList,
    inputField,
  },
};
</script>
