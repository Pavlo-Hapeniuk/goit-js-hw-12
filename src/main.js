import { getImagesByQuery } from './js/pixabay-api';
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

  try {
    const hits = await getImagesByQuery(searchText, currentPage);
    await createGallery(hits, true);
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

  try {
    const hits = await getImagesByQuery(searchText, currentPage);
    await createGallery(hits, false);
  } catch {
    iziToast.error({
      message: `Error! Please try again!`,
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
