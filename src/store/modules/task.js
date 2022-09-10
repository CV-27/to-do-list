import { defineStore } from 'pinia';
import supabase from '@/supabase/index';

export default defineStore('tasks', { // sync tasks from pinia and supabase
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() { // fetch tasks by ID descending order
      const { data: tasks } = await supabase // get all tasks from supabase
        .from('tasks') // database name
        .select('*') // get all
        .order('id', { ascending: true }); // ID descending order
      this.tasks = tasks;
      return this.tasks; // save tasks on state parameter
    },

    async addTask(title, id) {
      const { data: tasks, error } = await supabase
        .from('tasks').insert([
          {
            user_id: id,
            title,
            is_complete: false,
          },
        ]);
      this.tasks = tasks;
      if (error) {
        console.log(error.message);
      }
    },

    async editTask(title, id) {
      const { data: tasks, error } = await supabase.from('tasks').update({
        title,
      }).match({
        id,
      });
      this.tasks = tasks;
      if (error) {
        console.log(error.message);
      }
    },

    async deleteTask(id) {
      const { data: tasks, error } = await supabase.from('tasks').delete().match({
        id,
      });
      this.tasks = tasks;
      if (error) {
        console.log(error.message);
      }
    },

    async toggleTask(isComplete, id) {
      const { data: tasks, error } = await supabase.from('tasks').update({
        isComplete,
      }).match({
        id,
      });
      this.tasks = tasks;
      if (error) {
        console.log(error.message);
      }
    },
  },
});
