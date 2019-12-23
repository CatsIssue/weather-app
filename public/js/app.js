console.log('javascript was loaded');

fetch('http://puzzle.mead.io/puzzle').then((responce) => {
    responce.json().then(( data) => {
        console.log(data);
    });
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('all good');

    const location = search.value;
    console.log(location);

    fetch('/weather?address=' + location).then((responce) => {
        responce.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
});