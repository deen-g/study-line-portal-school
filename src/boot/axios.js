import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { notifications } from "boot/notification"

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const rest = axios.create({
  timeout :5000,
  headers :{
    'Content-Type' :'application/json',
    'x-portal' :process.env.portal
  }
})
export default boot(async ({app}) => {
  rest.defaults.baseURL = process.env.uri+'/api/v1'
  console.log('axios url:', rest.defaults.baseURL)
  // for use inside Vue files (Options API) through this.$axios and this.$api
// Add a request interceptor
  rest.interceptors.request.use(function (config){
    // Do something before request is sent
    let token = localStorage.getItem(process.env.auth)
    if(token){
      config.headers['x-authorization-token'] = `${token}`;
    }
    let school = localStorage.getItem(process.env.schoolToken)
    if(school){
      config.headers['x-school-token'] = `${school}`;
    }
    return config;
  }, function (error){
    // Do something with request error
    return Promise.reject(error);
  }, {synchronous :true});
// Add a response interceptor
  rest.interceptors.response.use(function (response){
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data){
      return {
        status :response.data.status,
        data :response.data.data
      };
    }
    return response;
  }, function (error){
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let {response} = error
    if(response && response.data){
      let code = response.status
      let {message} = response.data
      if(code >= 400 && code < 500){
        notifications.warning(message)
      } else if(code >= 500){
        notifications.negative(message)
      }
      return {
        status :false,
        message :response.data.message
      }
    } else {
      notifications.negative('connection error')
    }

  });

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = rest
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { rest }
