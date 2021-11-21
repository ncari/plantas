export const createFormData = (photo, body = {}) => {
  const data = new FormData();

  const name = photo.uri.substring(
    photo.uri.lastIndexOf("/") + 1,
    photo.uri.length
  );

  data.append("image", {
    type: "image/jpeg",
    uri: photo.uri,
    name: name,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};
