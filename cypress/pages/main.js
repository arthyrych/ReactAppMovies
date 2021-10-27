export class MainPage {

    getMoviesList() {
        return cy.get('[data-test-id="movies-list-movie"]')
    }

    getFilter() {
        return cy.contains('Filter')
    }

}