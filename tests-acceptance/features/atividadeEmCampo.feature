Scenario: Registro de Atividade em campo, sem os dados dos alunos que compareceram
Given estou na página de registro de atividade em campo
Given vejo a seções vazias de atividade, profissional, participantes, local, data inicial, data final
When preencho com a atividade "Acolhimento", profissional "Lucas Mendonça", local "CEU", data inicial "31/12/19", data final "31/12/19"
When aperto em salvar
Then vejo a atividade "Acolhimento", profissional "Lucas Mendonça", local "CEU", data inicial "31/12/19", data final "31/12/19"

Scenario: Busca de Atividade em campo durante o mês de fevereiro de 2018.
Given estou na "página de busca" de atividade em campo
And vejo as seções vazias de atividade, profissional, datas, participantes, local
When preencho a seção de data com "01/02/2019" entre "28/02/2019"
And aperto em "buscar"
Then eu vejo o registro de atividade "Palestra sobre o RU", profissional "Roberta Maria", participante "Jennifer", local "Casa Mista", data inicial "15/02/19", data final "15/02/19"

Scenario:Busca da relação de estudante do acolhimento realizado fora do NASE.
Given estou na "página de busca" com a busca "acolhimento" já efetuada
And vejo a atividade "Acolhimento", profissional "Lucas Mendonça", participantes "Roberto ...", local "CEU", data inicial "31/12/19", data final "31/12/19"
When eu aperto em "expandir atividade"
Then eu vejo atividade "Acolhimento", profissional "Lucas Mendonça", participantes "Roberto Tomás da Silva", "Íris Soares dos Santos", "Aline Gouveia Matias", "Thais Amara Silva de Mendonça", local "CEU", data "31/12/19", data final "31/12/19"

Scenario: Edição de uma atividade em campo realizado no local errado.
Given estou na "página de edição" de atividade em campo
And vejo atividade "Palestra sobre DST", profissional "Eusa Marina Mendonça", participantes "Douglas Tomás da Silva", "José Gabriel", "Bruno Matias", "Xuliano Domingos", local "CEU", data inicial "31/12/19", data final "31/12/19"
When faço a alteração de "CEU" para "Centro de Informática - CIn"
And aperto em "Atualizar"
Then eu vejo uma mensagem de "Atualização Realizada com Sucesso"