import api from "../api";

export const getBlogPosts = async () => {
  const response = await api.get("api/BlogPosts");

  return response.data;
};
