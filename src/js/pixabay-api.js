import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const PER_PAGE = 15;

export async function getImagesByQuery(query, currentPage) {
  const API_KEY = '53374689-de9604de74fdd47daed383deb';

  try {
    const res = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: PER_PAGE,
      },
    });

    if (!res.data.hits || res.data.hits.length === 0) {
      iziToast.info({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 3000,
      });
      return { hits: [], totalHits: 0 };
    }
    return { hits: res.data.hits, totalHits: res.data.totalHits };
  } catch {
    iziToast.error({
      message: `Something went wrong. Please try again later.`,
      backgroundColor: '#ef4040',
      position: 'topRight',
      timeout: 4000,
    });
    return { hits: [], totalHits: 0 };
  }
}

export { PER_PAGE };
