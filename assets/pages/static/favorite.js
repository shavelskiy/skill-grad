import { addProviderToFavorite } from '../../components/favorite'

const tabProviders = document.querySelector('.tab-providers')
const tabPrograms = document.querySelector('.tab-programs')
const tabArticles = document.querySelector('.tab-articles')

const navProviders = document.querySelector('.nav-item-providers')
const navPrograms = document.querySelector('.nav-item-programs')
const navArticles = document.querySelector('.nav-item-articles')

const initNavClick = (nav) => {
  nav.onclick = () => {
    if (nav.classList.contains('active')) {
      return
    }

    switch (nav) {
      case navProviders:
        navPrograms.classList.remove('active')
        navArticles.classList.remove('active')

        tabPrograms.classList.remove('active')
        tabArticles.classList.remove('active')

        tabProviders.classList.add('active')

        break
      case navPrograms:
        navProviders.classList.remove('active')
        navArticles.classList.remove('active')

        tabProviders.classList.remove('active')
        tabArticles.classList.remove('active')

        tabPrograms.classList.add('active')

        break
      case navArticles:
        navProviders.classList.remove('active')
        navPrograms.classList.remove('active')

        tabProviders.classList.remove('active')
        tabPrograms.classList.remove('active')

        tabArticles.classList.add('active')

        break
    }

    nav.classList.add('active')
  }
}

initNavClick(navProviders)
initNavClick(navPrograms)
initNavClick(navArticles)

document.querySelectorAll('.add-provider-favorites').forEach(item => {
  item.onclick = () => addProviderToFavorite(item)
})