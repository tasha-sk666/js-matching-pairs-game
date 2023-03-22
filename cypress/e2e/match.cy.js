/// <reference types="cypress" />
/* eslint-disable no-loop-func */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

describe('Проверка работы Игры в пары', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
    cy.viewport(1440, 900);
    cy.wait(1000);
  });

  it('Игра имеет поле 4х4', () => {
    cy.get('.card').should('have.length', 16);
  });
  it('В каждой клетке цифра невидима', () => {
    cy.get('.card').should('not.have.class', 'flipped');
  });
  it('После нажатия карточка остается открытой', () => {
    cy.get('.card').first().click().wait(1000).should('have.class', 'flipped');
  });
  it('Первая найденная пара карточек остается видимой', () => {
    cy.get('.card').its('length').as('cardsCount');
    cy.get('@cardsCount').then(cards => {
      const findSuccessCards = (n) => {
        if (n < cards) {
          cy.get('.card').first().click();
          cy.get('.card').eq(n).click().then((card) => {
            if (card.hasClass('success')) {
              cy.get('.card.success').should('have.length', 2);
              cy.log('**MATCH**');
              return
            }

            cy.wait(600, { log: false });
            findSuccessCards(n + 1);
          });
        }
      };
      findSuccessCards(1);
    });
  });

  it('Первая найденная пара карточек остается видимой', () => {
    cy.get('.card').its('length').as('cardsCount');
    cy.get('@cardsCount').then(cards => {
      const findUnSuccessCards = (n) => {
        if (n < cards) {
          cy.get('.card').eq(n).click();
          cy.get('.card').eq(n + 1).click().then((card) => {
            if (card.hasClass('success')) {
              cy.wait(600, { log: false });
              findUnSuccessCards(n + 2);
              return
            }
            cy.get('.card').eq(n).should('not.have.class', 'sucess').and('not.have.class', 'flipped');
            cy.get('.card').eq(n + 1).should('not.have.class', 'sucess').and('not.have.class', 'flipped');
          });
        }
      };
      findUnSuccessCards(0);
    });
  });
});
