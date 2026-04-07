const mobileView = window.matchMedia('(max-width: 953px)')

const asideNav = document.querySelector('.aside-nav')
const btnAsideCollapse = document.querySelector('.cbd-btn-aside-collapse')

function switchTomobileview (e) {
  if (e.matches) {
    asideNav.classList.add('aside-collapsed')
  }
}

mobileView.addEventListener('change', switchTomobileview)
switchTomobileview(mobileView)

btnAsideCollapse.addEventListener('click', () => {
  asideNav.classList.toggle('aside-collapsed')
})
