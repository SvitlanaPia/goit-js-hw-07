import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

function createPhotoElements(photos) {
  return photos
    .map(({ preview, original, description }) => {
      return `
    <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
    </a>`;
    })
    .join("");
}

const createdPhotos = createPhotoElements(galleryItems);
galleryEl.innerHTML = createdPhotos;

galleryEl.addEventListener("click", onGalleryItemElClick);

function onGalleryItemElClick(event) {
  blockDefaultAction(event);

  const { target } = event;

  if (target.nodeName !== "IMG") {
    return;
  }

  const originalPhoto = new SimpleLightbox(".gallery a", {
    captionsData: `alt`,
    captionDelay: 250,
  });

  galleryEl.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      close.simplelightbox();
    }
  });
}

function blockDefaultAction(event) {
  event.preventDefault();
}
