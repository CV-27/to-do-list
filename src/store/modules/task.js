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
        throw error;
      }
      if (tasks.length) {
        this.tasks.push(tasks[0]);
      }
    },

    async editTask(title, id) {
      const { error } = await supabase.from('tasks').update({
        title,
      }).match({
        id,
      });
      console.log(title);
      if (error) {
        console.log(error.message);
        throw error;
      }
    },

    async deleteTask(id) {
      const { error } = await supabase.from('tasks').delete().match({
        id,
      });
      if (error) {
        console.log(error.message);
        throw error;
      }
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },

    async toggleTask(isComplete, id) {
      const { error } = await supabase.from('tasks').update({
        is_complete: isComplete,
      }).match({
        id,
      });
      if (error) {
        console.log(error.message);
        throw error;
      }
      const taskToComplete = this.tasks.find((item) => item.id === id);
      if (taskToComplete) {
        taskToComplete.is_complete = !taskToComplete.is_complete;
      }
    },
  },
});
