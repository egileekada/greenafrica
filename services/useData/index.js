import axios from "../axiosConfig";

const getBanner = async () => {
  const { data } = await axios.get("/banners");
  return data;
};

const getMobileBanner = async () => {
  const { data } = await axios.get("/banners?type=mobile");
  return data;
};

const getWidgetData = async () => {
  const { data } = await axios.get(`/destination_matrices/transformed`);
  return data;
};

const getDestinations = async (query) => {
  const { data } = await axios.get(`/destination_matrices?from=${query}`);
  return data;
};

const getLocations = async () => {
  const { data } = await axios.get("/locations");
  return data;
};

const getPopup = async () => {
  const { data } = await axios.get("/popups");
  return data;
};

const getPosts = async () => {
  const { data } = await axios.get("/posts");
  return data;
};

const getPostsBySlug = async (slug) => {
  const { data } = await axios.get(`/posts${slug}`);
  return data;
};

const getPostsByCategory = async (category) => {
  const { data } = await axios.get(`/posts/category`);
  return data;
};

const getFAQs = async () => {
  const { data } = await axios.get("/faqs");
  return data;
};

const getFAQsCategory = async () => {
  const { data } = await axios.get("/faqs/categories");
  return data;
};

const getFAQByCat = async (category) => {
  const { data } = await axios.get(`/faqs/${category}`);
  return data;
};

const getOffices = async () => {
  const { data } = await axios.get("/offices");
  return data;
};

const getContacts = async () => {
  const { data } = await axios.get("/contacts");
  return data;
};

const getNotifications = async () => {
  const { data } = await axios.get("/notifications");
  return data;
};

const getPageBySlug = async (slug) => {
  const { data } = await axios.get(`/pages/${slug}`);
  return data;
};

export {
  getMobileBanner,
  getBanner,
  getWidgetData,
  getDestinations,
  getLocations,
  getPopup,
  getPosts,
  getPostsBySlug,
  getPostsByCategory,
  getFAQsCategory,
  getFAQs,
  getFAQByCat,
  getOffices,
  getContacts,
  getPageBySlug,
  getNotifications,
};
