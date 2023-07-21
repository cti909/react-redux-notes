import axios from "axios";

//user1-admin
export const getAllNotes = () => {
  console.log("api getAllNotes");
  const token = localStorage.getItem("accessToken");
  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk4MTc1NzcsImV4cCI6MTY4OTgyMTE3NywibmJmIjoxNjg5ODE3NTc3LCJqdGkiOiJnT3E5a1A1VmozdzJObkdYIiwic3ViIjoiMTYiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.NXsJAjex8U5j0cLBO-y_fIJ8Yg-E7SVUGZz3yl1J8TQ"
  return axios
    .get("http://127.0.0.1:8000/api/notes?sortType=desc&column=updatedAt", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const filterAllNotes = (sortType, column, search, page) => {
  console.log("api filterAllNotes");
  const token = localStorage.getItem("accessToken");
  return axios
    .get(
      `http://127.0.0.1:8000/api/notes?sortType=${sortType}&column=${column}&where=title[like]${search}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNotes = (title, text, user_id) => {
  console.log("api addNotes");
  const token = localStorage.getItem("accessToken");
  const postData = {
    title: title,
    text: text,
    user_id: user_id,
  };
  return axios
    .post(
      `http://127.0.0.1:8000/api/notes?sortType=desc&column=updatedAt`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const editNotes = (title, text, note_id) => {
  console.log("api editNotes");
  const token = localStorage.getItem("accessToken");
  const postData = {
    title: title,
    text: text,
  };
  return axios
    .put(
      `http://127.0.0.1:8000/api/notes/${note_id}?sortType=desc&column=updatedAt`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteNotes = (note_id, sortType, column, search) => {
  console.log("api deleteNotes");
  const token = localStorage.getItem("accessToken");
  return axios
    .delete(
      `http://127.0.0.1:8000/api/notes/${note_id}?sortType=${sortType}&column=${column}&where=title[like]${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
