export class MainPage {
    visit() {cy.visit('/')}
    getFilter() {return cy.get('label').contains('Filter')}
    getFilterInput() {return this.getFilter().find('input')}
    getFilterInputAndType(text) {return this.getFilterInput().type(text)}
    getMoviesList() {return cy.get('[data-test-id="movies-list-movie"]')}
    getNonExistingMovie() {return cy.get('[data-test-id="movies-loading-movie"]')}
}