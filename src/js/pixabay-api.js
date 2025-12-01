import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function getImagesByQuery(query) {
  const API_KEY = '53374689-de9604de74fdd47daed383deb';

  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(res => {
      if (!res.data.hits || res.data.hits.length === 0) {
        iziToast.info({
          message: `Sorry, there are no images matching your search query. Please try again!`,
          backgroundColor: '#ef4040',
          position: 'topRight',
          timeout: 3000,
        });
        return [];
      } else {
        return res.data.hits;
      }
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        message: `Something went wrong. Please try again later.`,
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 4000,
      });
      return [];
    });
}
