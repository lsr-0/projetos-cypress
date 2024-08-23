Feature: Teste de Formulário de Prática

  Scenario: Deve preencher e enviar o formulário com sucesso
    Given que eu estou na página do formulário de prática
    When eu preencho o primeiro nome com "John"  
    Then eu preencho o sobrenome com "Doe"
    And eu preencho o email com "john.doe@example.com"
    And eu seleciono o gênero masculino
    And eu preencho o número de telefone com "1234567890"
    Also eu seleciono a data de nascimento "18"
    And eu preencho o endereço com "123 Main St"
    And eu seleciono o estado "NCR"
    And eu seleciono a cidade "Delhi"
    Then eu envio o formulário
    Then eu vejo uma mensagem de sucesso "Thanks for submitting the form"
    Also eu tiro uma captura de tela do formulário enviado
    Then eu fecho a modal