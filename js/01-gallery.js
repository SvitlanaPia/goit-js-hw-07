import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

function createPhotoElements(photos) {
  return photos
    .map(({ preview, original, description }) => {
      return `
         <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
         </div>
        `;
    })
    .join("");
}

const createdPhotos = createPhotoElements(galleryItems);
galleryEl.innerHTML = createdPhotos;

galleryEl.addEventListener("click", onGalleryItemElClick);

function onGalleryItemElClick(event) {
  event.preventDefault();

  const { target } = event;

  if (target.nodeName !== "IMG") {
    return;
  }

  const originalPhoto = basicLightbox.create(
    `
  <img src="${target.dataset.source}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onEscapePress);
      },

      onClose: (instance) => {
        document.removeEventListener("keydown", onEscapePress);
      },
    }
  );

  originalPhoto.show();

  function onEscapePress(event) {
    if (event.code === "Escape") {
      originalPhoto.close();
    }
  }
}
