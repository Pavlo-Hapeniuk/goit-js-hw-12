import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const simplelightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 500,
});

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.load-more-wrapper .loader');

function cardTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `     
      <li class="gallery-card">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image" width="360" height="200"/>
        </a>
        <div class="gallery-stats">
          <p><strong>Likes</strong> <span class="likes">${likes}</span></p>
          <p><strong>Views</strong> <span class="views">${views}</span></p>
          <p><strong>Comments</strong> <span class="comments">${comments}</span></p>
          <p><strong>Downloads</strong> <span class="downloads">${downloads}</span></p>
        </div>
      </li>`;
}

function cardsTemplate(cards) {
  return cards.map(cardTemplate).join('');
}

export function createGallery(cards, replace = false) {
  if (replace) {
    gallery.innerHTML = cardsTemplate(cards);
  } else {
    gallery.insertAdjacentHTML('beforeend', cardsTemplate(cards));
  }

  simplelightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

export function showLoadMoreButton(loadMore) {
  loadMore.classList.remove('hidden');
}

export function hideLoadMoreButton(loadMore) {
  loadMore.classList.add('hidden');
}
