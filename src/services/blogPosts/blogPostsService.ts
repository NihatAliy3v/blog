import api from "../api";

export const getBlogPosts = async () => {
  const response = await api.get("/BlogPosts");

  return response.data;
};
