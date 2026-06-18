import API from "./api";

export const getFeed = async () => {
  const response = await API.get("/api/posts/feed");
  return response.data;
};

export const createPost = async (postData) => {
  const response = await API.post("/api/posts", postData);
  return response.data;
};

export const likePost = async (postId) => {
  const response = await API.put(`/api/posts/like/${postId}`);
  return response.data;
};

export const unlikePost = async (postId) => {
  const response = await API.put(`/api/posts/unlike/${postId}`);
  return response.data;
};

export const addComment = async (postId, text) => {
  const response = await API.post(`/api/posts/comment/${postId}`, {
    text,
  });
  return response.data;
};

export const deleteComment = async (postId, commentId) => {
  const response = await API.delete(
    `/api/posts/comment/${postId}/${commentId}`
  );
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await API.delete(`/api/posts/${postId}`);
  return response.data;
};

export const getUserPosts = async (id) => {
  const response = await API.get(`/api/posts/user/${id}`);
  return response.data;
};