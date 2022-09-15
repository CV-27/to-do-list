import { defineStore } from 'pinia';
import supabase from '@/supabase/index';
import useUserStore from './user';

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
      this.tasks = tasks;// save tasks on state parameter
      return tasks;
    },

    async addTask(title) {
      const userStore = useUserStore();
      const { data: tasks, error } = await supabase
        .from('tasks').insert([
          {
            user_id: userStore.user.id,
            title,
          },
        ]);
      if (error) {
        console.log(error.message);
      }
      if (tasks.length) {
        this.tasks.push(tasks[0]);
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
      const { error } = await supabase.from('tasks').delete().match({
        id,
      });
      if (error) {
        console.log(error.message);
      }
      const taskIndex = id;
      this.tasks.splice(taskIndex, 1);
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
