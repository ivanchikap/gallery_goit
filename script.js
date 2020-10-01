import gallery from './gallery-items.js';

const ulGallery = document.querySelector('ul.gallery');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const leftArrow = document.querySelector('#arrow-left');
const rightArrow = document.querySelector('#arrow-right');

let imageSrc;
let imageIndex=0;


const createLiTemplate = (galleryItem) => {
    const li = document.createElement('li');
    li.classList.add('gallery__item');

    const a = document.createElement('a');
    a.classList.add('gallery__link');
    a.href = galleryItem.original;

    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = galleryItem.original;
    img.dataset.source = galleryItem.original;
    img.alt = galleryItem.description;
    img.setAttribute('data-index', galleryItem.index)

    a.appendChild(img);
    li.appendChild(a);

    return li
};

const mappedGallery = gallery.map((item) => createLiTemplate(item));

ulGallery.append(...mappedGallery);

function onModalOpen(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        console.log('Тыкнули не в картинку');
        return
    }
    imageSrc = e.target.src;
    imageIndex = Number(e.target.dataset.index);
    openModal(imageIndex);
    window.addEventListener('keyup', onKeyPress);
}

function openModal(imageIndex) {
    lightboxImg.src = gallery[imageIndex].original;
    lightbox.classList.add('is-open');
}
function closeModal(e) {
    if (e.target.nodeName === 'SPAN') {
        return;
    }
    if (e.target.nodeName !== 'IMG' && lightbox.classList.contains('is-open') && e.target.nodeName !== 'SPAN') {
        lightbox.classList.remove('is-open');
        lightboxImg.src= '';
    }

    window.removeEventListener('keyup', onKeyPress);


}

function onKeyPress(e) {
    console.log('keyPress');
    if (e.key === 'Escape') {
        closeModal(e);
    }
    if (e.key === 'ArrowLeft') {
       listLeft()
    }
    if (e.key === 'ArrowRight') {
        listRight()
    }
}

function listRight() {
    if (imageIndex + 2 > gallery.length) {
        console.log('Вправо дальше нельзя');
        return
    }
    imageIndex += 1;
    openModal(imageIndex);
}
function listLeft() {
    if (imageIndex -1 < 0) {
        console.log('Влево дальше нельзя');
        return
    }
    imageIndex -= 1;
    openModal(imageIndex);
}



ulGallery.addEventListener('click', onModalOpen);
lightbox.addEventListener('click', closeModal);

leftArrow.addEventListener('click', listLeft);
rightArrow.addEventListener('click', listRight);