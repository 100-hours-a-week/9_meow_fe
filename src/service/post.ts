import defaultInstance from "./instance/defaultInstance";

const baseURL = `${import.meta.env.VITE_API_URL}`;

export const getPostList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const response = await defaultInstance.get(`${baseURL}/posts`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
