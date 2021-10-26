import {appData} from "../../data/appData"
import {MainPage} from "../../pages/main"

describe('spec description', () => {
    const mainPage = new MainPage

    beforeEach(() => {
        cy.intercept(appData.moviesApiUrl, {fixture: "moviesList"})
        cy.intercept(appData.configApiUrl, {fixture: "moviesConfig"})
        cy.visit('/')
    })

    it('check the Filter', () => {
        cy.contains('Filter')
    })

    it('check movie url', () => {
        mainPage.getMoviesList().first().then(($movie) => {
            const movieUrl = $movie.attr("href")
            console.log($movie.attr("href"))
            mainPage.getMoviesList().first().click()
            cy.url().should('include', movieUrl)
        })        
    })

    it('check number of movies', () => {
        mainPage.getMoviesList().should('have.length', 20)
    })

    it('some assertions', () => {
        mainPage.getMoviesList().should('exist')
        mainPage.getMoviesList().then(list => {
            expect(list).to.have.length(20)
        })
        cy.get('[data-test-id="movies-loading-movie"]').should('not.exist')
        cy.fixture('moviesList').then(jsonData => {
            console.log('jsonData', jsonData.results[0].title)
            expect(jsonData.results[0].title).to.eq("Venom: Let There Be Carnage")
        })
    })
})
