import API from "./api";

export const getUserProfile = async (id) => {
  const response = await API.get(`/api/users/profile/${id}`);
  return response.data;
};

export const followUser = async (id) => {
  const response = await API.put(`/api/users/follow/${id}`);
  return response.data;
};

export const unfollowUser = async (id) => {
  const response = await API.put(`/api/users/unfollow/${id}`);
  return response.data;
};

export const getUserPosts = async (id) => {
  const response = await API.get(`/api/posts/user/${id}`);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await API.put("/api/users/profile", profileData);
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await API.get(`/api/users/search?query=${query}`);
  return response.data;
};

export const getSuggestedUsers = async () => {
  const response = await API.get(`/api/users/suggested`);
  return response.data;
};