// Cypress end-to-end tests
describe("Navigation", () => {
  // Reset state of db before each test and visit root.
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday");
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday");
    cy.contains(".appointment__card--show", "Archie Cohen").wait(1000);
    cy.get("[alt=Edit]").first().click({ force: true });
    cy.get("[data-testid=student-name-input]").clear();
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
      .wait(1000);
    cy.contains("Save").click().wait(1000);
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should delete an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday");
    cy.contains(".appointment__card--show", "Archie Cohen").wait(1000);
    cy.get("[alt=Delete]").first().click({ force: true }).wait(1000);
    cy.contains("Confirm").click().wait(1000);
    cy.get("[data-testid=appointment]").should("not.have.text", "Archie Cohen");
  });
});
