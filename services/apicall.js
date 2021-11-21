import { api } from "../config/config";

export function Register(name, email, password, device_name) {
  return new Promise((resolve, reject) => {
    fetch(`${api}/users/register`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        device_name,
      }),
    })
      .then((res) => res.text())
      .then((token) => resolve(token))
      .catch((err) => reject(err));
  });
}

export function Login(email, password, device_name) {
  return new Promise((resolve, reject) => {
    fetch(`${api}/sanctum/token`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        device_name,
      }),
    })
      .then((res) => res.text())
      .then((token) => resolve(token))
      .catch((err) => reject(err));
  });
}

export function Get(url, bearer) {
  return new Promise((resolve, reject) => {
    fetch(`${api}${url}`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

export function Post(url, data, bearer, jsonResponse = true) {
  return PostHelper("post", url, data, bearer, jsonResponse);
}

export function Patch(url, data, bearer, jsonResponse = true) {
  return PostHelper("patch", url, data, bearer, jsonResponse);
}

export function Put(url, data, bearer, jsonResponse = true) {
  return PostHelper("put", url, data, bearer, jsonResponse);
}

// Pre: data must be an instance of FormData
export function PostImage(url, data, bearer, jsonResponse = true) {
  if (!(data instanceof FormData)) {
    throw Error("Data must be of type FormData");
  }

  return new Promise((resolve, reject) => {
    fetch(`${api}${url}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${bearer}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
      .then((res) => {
        if (jsonResponse) return res.json();
        else return resolve(res);
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

function PostHelper(method, url, data, bearer, jsonResponse) {
  return new Promise((resolve, reject) => {
    fetch(`${api}${url}`, {
      method: method,
      headers: {
        Authorization: `Bearer ${bearer}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => {
        if (jsonResponse) return res.json();
        else return resolve(res);
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}
