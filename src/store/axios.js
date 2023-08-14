import { $http } from "../http";

// Add a request interceptor
$http.interceptors.request.use(
  (config) => {
    const token = "localStorageService.getAccessToken()";
    if (token) {
      config.headers["Authorization"] = `Bearer ${process.env.VUE_APP_API_KEY}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
