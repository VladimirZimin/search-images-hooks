import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api";
const API_KEY = "33022433-0efd7ccbf8abb7290c8dd54c5";
const PER_PAGE = 12;

const getImage = async (query, page) => {
  try {
    const response = await axios.get(
      `/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const api = {
  getImage,
};

export default api;

/*
const getImages = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000,

  params: {
    key: '23833327-aee66bbf86a23c3fb1d188dcb',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export async function fetchArticles(q, page) {
  try {
    const { data } = await getImages('', { params: { q, page } });
    return data;
  } catch (error) {
    toast.error(`Nothing found like ${q}`);
  }
}
*/
