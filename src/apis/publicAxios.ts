import axios from "axios";


const publicAxios = axios.create({timeout: 10000});
publicAxios.defaults.baseURL = process.env['HOST'];
publicAxios.interceptors.request.use(
  async function (request) {
      return request;
  },
    function (error) {
        return Promise.reject(error);
    },
)

publicAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
        return Promise.reject(error);
    }
  );

  export default publicAxios;