import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

export const login = (email, password) => {
  console.log("api login");
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.meta) {
        localStorage.setItem("accessToken", response.data.meta);
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      //   console.log(response);
      return response.data;
    })
    .catch((error) => {
      // Trả về lỗi để các thành phần khác có thể xử lý tiếp hoặc hiển thị thông báo lỗi cho người dùng
      return Promise.reject(error);
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = (name, email, password) => {
  console.log("api register");
  return axios
    .post(API_URL + "register", {
      name,
      email,
      password,
    })
    .then((response) => {
      //   console.log(response);
      return response.data;
    })
    .catch((error) => {
      // Trả về lỗi để các thành phần khác có thể xử lý tiếp hoặc hiển thị thông báo lỗi cho người dùng
      return Promise.reject(error);
    });
};