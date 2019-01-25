console.log('Hey');

document.querySelector('.btn-pink').addEventListener('click', () => {
    console.log('Click');
    const boxPink = document.querySelector('.container--pink');
    const boxBlue = document.querySelector('.container--blue');
    const boxYellow = document.querySelector('.container--yellow');

    const boxOverview = document.querySelector('.app__overview');
    const boxAppear = document.querySelector('.app__list');



    boxBlue.classList.add('fadeOut');
    boxYellow.classList.add('fadeOut');

    boxBlue.addEventListener("transitionend", function(event) {
        boxPink.classList.remove('col-1-of-3');
        boxPink.classList.add('animWindow');
        boxBlue.classList.add('invisible');
        boxYellow.classList.add('invisible');


        boxOverview.classList.add('app__info-extended');

        boxAppear.classList.remove('collapse');
        boxAppear.classList.add('show');




      }, false);
})