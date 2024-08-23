const { defineConfig } = require("cypress");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const nodePolyfills = require("@esbuild-plugins/node-modules-polyfill").NodeModulesPolyfillPlugin;
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const sharp = require("sharp");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Adiciona suporte para Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Cria um bundler para processar arquivos com suporte a polyfills
      on(
        "file:preprocessor",
        createBundler({
          plugins: [nodePolyfills(), createEsbuildPlugin(config)],
        })
      );

      // Atualiza o specPattern para reconhecer arquivos .feature e .cy
      config.specPattern = [
        "cypress/integration/features/**/*.feature",
        "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        "cypress/integration/**/*.js",
        "cypress/e2e/path-to-step-definition/**/*.{js,ts}",
        "cypress/e2e/features/**/*.feature",
      ];

      // Tarefa para adicionar timestamp à captura de tela
      on("task", {
        addTimestampToScreenshot(screenshotPath) {
          const outputFilePath = screenshotPath.replace(".png", "-with-timestamp.png");
          const timestamp = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "");
          
          return sharp(screenshotPath)
            .composite([
              {
                input: Buffer.from(
                  `<svg width="400" height="60">
                    <text x="10" y="30" font-size="30" fill="white">${timestamp}</text>
                  </svg>`
                ),
                top: 10,
                left: 10,
              },
            ])
            .toFile(outputFilePath)
            .then(() => outputFilePath)
            .catch((err) => {
              console.error(err);
              throw new Error("Could not add timestamp to screenshot.");
            });
        },
      });

      // Retorna a configuração para que o Cypress a utilize
      return config; 
    },
  },
});