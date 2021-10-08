const elem = document.querySelectorAll('[data-anim="fade"]');
const elem2 = document.querySelectorAll('[data-anim="fadeup"]');

console.log(elem)

const observefade = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        console.log(entry);
        if(entry.isIntersecting) entry.target.classList.add('anim-fade')
    })
})

const observefadeup = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        console.log(entry);
        if(entry.isIntersecting) entry.target.classList.add('anim-fade-up')
    })
})


// observe.observe(elem)

elem.forEach( elem => observefade.observe(elem));
elem2.forEach( elem => observefadeup.observe(elem));


const hamburgerButton = document.querySelector('[data-menu="hamburger"]');
const hamburgerMenu = document.querySelector('.navbar');

// hamburgerButton.addEventListener('click', () => {
//     hamburgerMenu.classList.add('animate');
//     console.log('xd')
// });


window.addEventListener('click', e => {
    // if (!hamburgerMenu.contains(e.target)) hamburgerMenu.classList.remove('animate');
    // console.log('xd2')
    if (hamburgerButton.contains(e.target)) { 
        hamburgerMenu.classList.toggle('animate')
        return;
    }

    if(!hamburgerMenu.contains(e.target)) {
        hamburgerMenu.classList.remove('animate');
    }
})