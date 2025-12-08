import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';

const formElem = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.js-btn-load');

let searchText;
let currentPage;
let totalPages;

hideLoadMoreButton(loadMoreBtn);

formElem.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  searchText = formData.get('search-text').trim();
  currentPage = 1;

  if (!searchText) {
    iziToast.warning({
      message: `Please, enter something!`,
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();
  hideLoadMoreButton(loadMoreBtn);

  try {
    const { hits, totalHits } = await getImagesByQuery(searchText, currentPage);

    totalPages = Math.ceil(totalHits / PER_PAGE);

    if (hits.length === 0) {
      iziToast.info({
        message: `No results found.`,
        backgroundColor: '#ef4040',
        position: 'topRight',
      });

      return;
    }

    await createGallery(hits, true);

    if (currentPage >= totalPages) {
      hideLoadMoreButton(loadMoreBtn);
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        backgroundColor: '#67dadcff',
        position: 'topRight',
      });
    } else {
      showLoadMoreButton(loadMoreBtn);
    }
  } catch {
    iziToast.error({
      message: `Error! Please try again!`,
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }

  e.target.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton(loadMoreBtn);

  try {
    const { hits } = await getImagesByQuery(searchText, currentPage);

    if (hits.length > 0) {
      await createGallery(hits, false);

      const gallery = document.querySelector('.gallery');
      const cardHeight =
        gallery.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    if (hits.length === 0 || currentPage >= totalPages) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        backgroundColor: '#67dadcff',
        position: 'topRight',
      });
      hideLoadMoreButton(loadMoreBtn);
    } else {
      showLoadMoreButton(loadMoreBtn);
    }
  } catch {
    iziToast.error({
      message: `Error! Please try again!`,
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    showLoadMoreButton(loadMoreBtn);
  } finally {
    hideLoader();
  }
});
