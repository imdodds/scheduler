describe("Appointents", () => {

  beforeEach(() => {

    // Resets database and visits the root of the web server
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday");

  });

  it("should book an interview", () => {

    // Clicks the "Add" button on the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();

    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // Clicks the "Save" button
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {

    // Clicks the edit button for an existing appointment
    cy.get("[alt=Edit]")
    .first()
    .click({force: true});

    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    // Clicks the "Save" button
    cy.contains("Save").click();

    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {

    // Clicks the "Delete" button for the existing appointment
    cy.get("[alt=Delete]")
      .click({force: true});

    // Clicks the "Confirm" button
    cy.contains("Confirm").click();

    // Sees that the appointment slot is empty
    cy.contains("Deleting...").should("exist");
    cy.contains("Deleting...").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");

  });

});

