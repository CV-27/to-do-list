import { defineStore } from 'pinia';
import supabase from '@/supabase/index';

export default defineStore('tasks', { // sync tasks from pinia and supabase
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() { // fetch tasks by ID descending order
      const { data: tasks } = await supabase // get data from supabase
        .from('tasks') // database name
        .select('*') // get all
        .order('id', { ascending: false }); // ID descending order
      this.tasks = tasks; // save tasks on state parameter
    },
  },
});
