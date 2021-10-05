describe('make sure site loads', () => {

    it('page loads', () => {

        cy.visit('http://localhost:3000/')
        cy.contains('Filter')
        cy.get('[data-test-id="movies-list-movie"]').first().then(($movie) => {
            const movieUrl = $movie.attr("href")
            console.log($movie.attr("href"))
            cy.get('[data-test-id="movies-list-movie"]').first().click()
            cy.url().should('include', movieUrl)
    
        })
    })

})