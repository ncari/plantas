import axiosInstance from "./axios";

export function Register(name, email, password, device_name) {
  return axiosInstance.post("/users/register", {
    name,
    email,
    password,
    device_name,
  });
}

export function Login(email, password, device_name) {
  return axiosInstance.post("/sanctum/token", {
    email,
    password,
    device_name,
  });
}

export function Get(url, bearer) {
  return axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
}

export function Post(url, data, bearer) {
  return axiosInstance.post(url, data, {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
}

export function Patch(url, data, bearer) {
  return axiosInstance.patch(url, data, {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
}

export function Put(url, data, bearer) {
  return axiosInstance.put(url, data, {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
}

// Pre: data must be an instance of FormData
export function PostImage(url, data, bearer) {
  if (!(data instanceof FormData)) {
    throw Error("Data must be of type FormData");
  }

  return axiosInstance.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${bearer}`,
    },
  });
}
