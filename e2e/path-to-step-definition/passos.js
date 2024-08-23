import { Given, When, Then, And, Also } from '@badeball/cypress-cucumber-preprocessor'; 

Given('que eu estou na página do formulário de prática', () => {
    cy.viewport(1280, 720); // Define o tamanho do viewport
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;     
    });
    cy.visit('https://demoqa.com/automation-practice-form'); // Acessa a página do formulário
});

When('eu preencho o primeiro nome com {string}', (nome) => {
    cy.get('#firstName').type(nome); // Preenche o primeiro nome
});

Then('eu preencho o sobrenome com {string}', (sobrenome) => {
    cy.get('#lastName').type(sobrenome); // Preenche o sobrenome
});

And('eu preencho o email com {string}', (email) => {
    cy.get('#userEmail').type(email); // Preenche o email
});

And('eu seleciono o gênero masculino', () => {
    cy.get(`label[for="gender-radio-1"]`).click(); // Seleciona gênero masculino
});

And('eu preencho o número de telefone com {string}', (numero) => {
    cy.get('#userNumber').type(numero); // Preenche o número de telefone
});

Also('eu seleciono a data de nascimento {string}', (dia) => {
    cy.get('#dateOfBirthInput').click(); // Clica no campo de data de nascimento
    cy.get('.react-datepicker__month-container')
        .find('.react-datepicker__day')
        .contains(dia).click(); // Seleciona o dia desejado
});

And('eu preencho o endereço com {string}', (endereco) => {
    cy.get('#currentAddress').type(endereco); // Preenche o endereço
});

And('eu seleciono o estado {string}', (estado) => {
    cy.get('#state').click(); // Seleciona o estado
    cy.get('#state > div > div').contains(estado).click(); // Seleciona o estado
});

And('eu seleciono a cidade {string}', (cidade) => {
    cy.get('#city').click(); // Seleciona a cidade
    cy.get('#city > div > div').contains(cidade).click(); // Seleciona a cidade
});

Then('eu envio o formulário', () => {
    cy.get('#submit').click(); // Clica no botão de enviar
});

Then('eu vejo uma mensagem de sucesso {string}', (mensagem) => {
    cy.get('.modal-title').should('contain', mensagem); // Verifica a mensagem de sucesso
});

Also('eu tiro uma captura de tela do formulário enviado', () => {
    const screenshotFilePath = 'Formulario_enviado.png'; // Nome da imagem
    cy.screenshot(screenshotFilePath).then(() => {
        const fullScreenshotPath = `cypress/screenshots/${screenshotFilePath}`; // Caminho completo
        return cy.task('addTimestampToScreenshot', fullScreenshotPath); // Adiciona timestamp à captura
    });
});

Then('eu fecho a modal', () => {
    cy.get('#closeLargeModal').click({ force: true }); // Fecha a modal
});