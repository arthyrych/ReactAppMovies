export class MoviePage {
  returnToMainPage() {cy.go('back')}
  getTitle() {return cy.get('h1')}
}