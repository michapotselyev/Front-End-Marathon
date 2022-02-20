'use strict'
const qImages = 20;

for(let i = 1; i < qImages + 1; i++) {

    document.querySelector('.wrapper').insertAdjacentHTML('beforeend', 
    `    <div class="lazy-image">
            <img src="assets/images/temp.gif" data-src="assets/images/img${i}.jpg">
        </div>`
    );

}

let quantity = 0;
const images = document.querySelectorAll("[data-src]");
const message = document.querySelector("#message");

function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if(!src) {
        return;
    }

    quantity++;
    showMessage();
    img.src = src;
}



const imgOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    });
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});

function showMessage() {
    message.innerHTML = `Загружено изображений: ${quantity} из ${qImages}`;
    if(quantity === qImages) {
        message.classList.add('message_done');
        setTimeout(() => {
            message.classList.add("message_out");
        }, 3000);
    }
}