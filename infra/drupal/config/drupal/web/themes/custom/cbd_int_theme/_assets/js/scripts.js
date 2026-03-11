const mobile_view = window.matchMedia('(max-width: 953px)');

let aside_nav = document.querySelector('.aside-nav');
let btn_aside_collapse = document.querySelector('.cbd-btn-aside-collapse');

function switchTomobileview(e) {
    if (e.matches) {
        aside_nav.classList.add('aside-collapsed');
    }
}

mobile_view.addEventListener('change', switchTomobileview);
switchTomobileview(mobile_view);

btn_aside_collapse.addEventListener('click', () => {
    aside_nav.classList.toggle('aside-collapsed');
});