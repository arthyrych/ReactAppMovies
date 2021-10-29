import { appData } from "../../data/appData"
import { testData } from "../../data/testData"
import { MainPage } from "../../pages/mainPage"
import { MoviePage } from "../../pages/moviePage"

describe('spec description', () => {
    const mainPage = new MainPage
    const moviePage = new MoviePage

    beforeEach(() => {
        cy.intercept(appData.moviesApiUrl, { fixture: "moviesList" })
        cy.intercept(appData.configApiUrl, { fixture: "moviesConfig" })
        mainPage.visit()
    })

    it('check movies list', () => {
        mainPage.getMoviesList().should('exist').and('have.length', appData.amountOfMovies)
    })

    it('check non existing movie', () => {
        mainPage.getNonExistingMovie().should('not.exist')
    })

    it('check the filter', () => {
        mainPage.getFilter().should('be.visible')
        mainPage.getFilterInputAndType(testData.movieTitle)
        mainPage.getFilterInput().should('have.value', testData.movieTitle)
        mainPage.getMoviesList().should('have.length', 1)
    })

    it('check movies urls', () => {
        for (let i = 0; i < appData.amountOfMovies; i++) {
            mainPage.getMoviesList().eq(i).then(movie => {
                const movieUrl = movie.attr("href")
                mainPage.getMoviesList().eq(i).click()
                cy.url().should('include', movieUrl)
                moviePage.returnToMainPage()
            })
        }
    })

    it('check movies titles', () => {
        for (let i = 0; i < appData.amountOfMovies; i++) {
            cy.fixture('moviesList').then(jsonData => {
                mainPage.getMoviesList().eq(i).click()
                moviePage.getTitle().should('have.text', jsonData.results[i].title)
                moviePage.returnToMainPage()
            })
        }
    })
})
