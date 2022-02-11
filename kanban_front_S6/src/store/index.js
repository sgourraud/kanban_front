import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

import authHeader from '../utils/authHeader';

export default new Vuex.Store({
  state: {    
    accessToken: '',
    developers: [],
    taskTypes: [],
    taskStatus: [],
    tasks: []
  },
  getters: {
    developersOptions: (state) => {

      return state.developers.map(developer => {

        return {
          value: developer.id,
          text: developer.firstname + ' ' + developer.lastname
        };
      });
    },
    taskTypesOptions: (state) => {

      return state.taskTypes.map(taskType => {

        return {
          value: taskType.id,
          text: taskType.label
        };
      });
    }
  },
  mutations: {
    initJwt: function(state, payload) {

      state.accessToken = payload.accessToken;
    },
    loadDevelopers: function(state, payload) {

      state.developers = payload.developers;
    },
    loadTaskStatus: function(state, payload) {

      state.taskStatus = payload.taskStatus;
    },
    loadTaskTypes: function(state, payload) {

      state.taskTypes = payload.taskTypes;
    },
    loadTasks: function(state, payload) {

      state.tasks = payload.tasks;
    }
  },
  actions: {
    initializeApp: function(context) {

      axios
        .post('http://localhost:8080' + '/oauth/token?scope=any&grant_type=client_credentials',
          {

          },
          {
            auth: {
              username: clientID,
              password: clientSecret
            }
          }
        )
        .then(function(response){

          let payload = {
            accessToken : response.data.access_token
          }

          context.commit('initJwt', payload);

          context.dispatch('loadTaskStatus');

          context.dispatch('loadTaskTypes');
        }); 
    },
    loadDevelopers: function(context) {

      axios
        .get('http://localhost:8080' + '/developers', { headers: authHeader(context.state) })

        .then(function(response){

          let payload = {
            developers : response.data
          };

          context.commit('loadDevelopers', payload);
        });      
    },
    loadTaskStatus: function(context) {

      axios
        .get('http://localhost:8080' + '/task_status', { headers: authHeader(context.state) })

        .then(function(response){

          let payload = {
            taskStatus : response.data
          };

          context.commit('loadTaskStatus', payload);
        });      
    },
    loadTaskTypes: function(context) {

      axios
        .get('http://localhost:8080' + '/task_types', { headers: authHeader(context.state) })

        .then(function(response){

          let payload = {
            taskTypes : response.data
          };

          context.commit('loadTaskTypes', payload);
        });      
    },
    loadTasks: function(context) {

      axios
        .get('http://localhost:8080' + '/tasks', { headers: authHeader(context.state) })

        .then(function(response){

          let payload = {
            tasks : response.data
          };

          context.commit('loadTasks', payload);
        });      
    },
    moveLeftTask: function(context, payload) {

      axios
        .patch('http://localhost:8080' + '/tasks/' + payload.taskId,          
          {
            action: MOVE_LEFT
          },
          { 
            headers: authHeader(context.state) 
          })
        .then(function(){

          context.dispatch('loadTasks');
        });      
    },
    moveRightTask: function(context, payload) {

      axios
        .patch('http://localhost:8080'+ '/tasks/' + payload.taskId, 
          {
            action: MOVE_RIGHT
          },
          { 
            headers: authHeader(context.state) 
          })
        .then(function(){

          context.dispatch('loadTasks');
        });      
    }
  },
  modules: {
  }
});