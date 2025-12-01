import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const simplelightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 500,
});

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

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
          <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
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

export function createGallery(cards) {
  gallery.innerHTML = cardsTemplate(cards);
  simplelightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (loader) loader.style.display = 'block';
}

export function hideLoader() {
  if (loader) loader.style.display = 'none';
}
