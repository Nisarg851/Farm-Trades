const card = document.querySelector('.card');
const container = document.querySelector('.container');

//Event Listeners
    //3d Effect
    container.addEventListener('mousemove',(e)=>{
        const x_axis = (window.innerWidth/2 - e.pageX)/80;
        const y_axis = (window.innerHeight/2 - e.pageY)/80;
        card.style.transform = `rotateY(${x_axis}deg) rotateX(${y_axis}deg)`;
    });

    //Animation In
    container.addEventListener('mouseenter',(e)=>{
        card.style.transition = 'all 0.01s ease';
    });

    //Animation out
    container.addEventListener('mouseleave',(e)=>{
        card.style.transition = 'all 1s ease';
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });