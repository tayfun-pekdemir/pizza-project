describe("Order Page Tests", () => {
  
  beforeEach(() => {
    cy.visit("http://localhost:5173/order");
  });

  it("isim inputuna metin girebilmeli", () => {
    cy.get('input[name="name"]')
      .type("Tayfun")
      .should("have.value", "Tayfun");
  });

  it("birden fazla malzeme seçilebilmeli", () => {
    const extras = [
      "Pepperoni",
      "Sosis",
      "Kanada Jambonu"
    ];

    extras.forEach(extra => {
      cy.get(`input[type="checkbox"][value="${extra}"]`).check().should("be.checked");
    });

    // Seçilen sayısını doğrula
    cy.get('input[type="checkbox"]:checked').should("have.length", extras.length);
  });

  it("formu başarıyla gönderebilmeli", () => {
    // Gerekli alanları doldur
    cy.get('input[name="name"]').type("Tayfun");
    cy.get('input[name="size"][value="medium"]').check();
    cy.get('#dough').select("standard");
    
    // Ek malzemelerden birkaçını seç
    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('input[type="checkbox"][value="Sosis"]').check();
    cy.get('input[type="checkbox"][value="Kanada Jambonu"]').check();
    cy.get('input[type="checkbox"][value="Tavuk Izgara"]').check();

    // Submit butonunu tıkla
    cy.get('button[type="submit"]').should("not.be.disabled").click();

    // Başarılı submit sonrası yönlendirme kontrolü
    cy.url().should("include", "/success");
  });

});
