import axios from 'axios';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', e => {
  e.preventDefault();
  const searchText = e.target.elements['search-text'].value.trim();
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

  getImagesByQuery(searchText)
    .then(hits => {
      createGallery(hits);
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        message: `Error! Please try again!`,
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });

  e.target.reset();
});
