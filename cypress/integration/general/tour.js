describe('spec description', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('correct movie url', () => {
        cy.contains('Filter')
        cy.get('[data-test-id="movies-list-movie"]').first().then(($movie) => {
            const movieUrl = $movie.attr("href")
            console.log($movie.attr("href"))
            cy.get('[data-test-id="movies-list-movie"]').first().click()
            cy.url().should('include', movieUrl)
    
        })
    })

    it('correct number of movies', () => {
        cy.get('[data-test-id="movies-list-movie"]').should('have.length', 20)
    })

    it('some assertions', () => {
        cy.get('[data-test-id="movies-list-movie"]').should('have.length', 20)
        cy.get('[data-test-id="movies-list-movie"]').should('exist')
        cy.get('[data-test-id="movies-loading-movie"]').should('not.exist')

        cy.fixture('moviesList').then((jsonData) => {
            console.log('jsonData', jsonData.results[0].title)
            expect(jsonData.results[0].title).to.eq("Venom: Let There Be Carnage")
        })
    })

})