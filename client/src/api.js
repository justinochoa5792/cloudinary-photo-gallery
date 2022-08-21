const API_URL = process.env.REACT_APP_API_URL;

export const getImages = async (next) => {
  const params = new URLSearchParams();

  if (next) {
    params.append("next_cursor", next);
  }

  const response = await fetch(`${API_URL}/photos?${params}`);
  const responseJson = await response.json();

  return responseJson;
};

export const searchImages = async (searchValue, next) => {
  const params = new URLSearchParams();
  params.append(`expression`, searchValue);

  if (next) {
    params.append("next_cursor", next);
  }
  const response = await fetch(`${API_URL}/search?${params}`);
  const responseJson = await response.json();

  return responseJson;
};
