
# Projeto Barbearia Simplon - Aplicação Mobile

## Considerações Finais

### Avaliação dos Frameworks Utilizados

#### React Native
- **Vantagens:** Permite desenvolvimento cross-platform, com um código base único para iOS e Android. Facilita a integração com APIs nativas e tem grande suporte da comunidade.
- **Desvantagens:** Algumas limitações em relação ao desempenho em operações intensivas. Dependência de pacotes nativos que podem requerer configurações e ajustes específicos.

#### Expo
- **Vantagens:** Facilitou o processo de desenvolvimento com seu sistema de build e deploy integrado. A configuração inicial do projeto foi muito simples.
- **Desvantagens:** Para projetos que exigem funcionalidades nativas específicas, o Expo pode ser limitante, embora seja possível "ejetar" do Expo se necessário.

#### TypeScript
- **Vantagens:** Forneceu tipagem estática, ajudando a evitar erros em tempo de execução e facilitando a colaboração no time.
- **Desvantagens:** Curva de aprendizado para quem não está familiarizado com a tipagem estática e necessidade de maior disciplina na estruturação do código.

#### Outras Bibliotecas
- **React Navigation:** Facilitou a implementação de navegação entre as telas.
- **MapView:** Permitiu a exibição de mapas, fundamental para a funcionalidade de localização da barbearia.
- **FontAwesome:** Utilizado para os ícones, garantindo uma interface visualmente agradável.

### Quadro Visual Atual de Gestão de Trabalho no Github

O código está hospedado no repositório GitHub e gerido por meio de branches. Utilizamos a abordagem de **feature branches**, onde cada nova funcionalidade é desenvolvida em uma branch separada. A branch `main` contém a versão estável do código, enquanto as alterações são revisadas antes de serem mescladas.

#### Status Atual das Contribuições dos Membros do Time no Github

Todos os membros da equipe colaboraram ativamente no desenvolvimento do projeto, contribuindo com suas habilidades específicas para garantir que todas as etapas fossem concluídas com sucesso. O trabalho conjunto foi essencial para a realização de tarefas, desde o planejamento até a implementação, assegurando a qualidade do produto final.

#### Comentários sobre Participações Individuais

- **Adrielly:** Atuou como desenvolvedora e realizou testes no sistema, focando em garantir que o usuário tenha uma experiência fluida e satisfatória.
- **Filipe:** Atuou como desenvolvedor e Scrum Master, orientando a equipe nas tarefas e assegurando que os processos seguissem as práticas ágeis.
- **Pedro:** Atuou como desenvolvedor e DevOps, gerenciando o pipeline de desenvolvimento e as integrações do projeto.
- **Yuri:** Atuou como desenvolvedor, realizou testes no sistema para melhorar a experiência do usuário e foi responsável pelo design completo do sistema, assegurando uma interface intuitiva e moderna.

---

## Análise Crítica e Proposta de Melhoria do Projeto Arquitetural e Implementação

### Análise Crítica

#### Arquitetura Atual
A arquitetura foi baseada no uso de **React Native** e **Expo**, com uma navegação simples e centralizada na exibição de informações estáticas e dinâmicas (ex: localização e contatos). A estrutura atende bem aos requisitos iniciais, mas pode ser limitada para escalabilidade no futuro.

#### Desempenho e Escalabilidade
O desempenho está adequado, mas para funcionalidades mais pesadas ou interações mais complexas, pode ser necessário revisar a arquitetura para garantir a escalabilidade da aplicação.

### Proposta de Melhoria

- **Notificações Nativas do Celular:** Implementar notificações push ou locais para melhorar a interação do usuário com o aplicativo, mantendo-os atualizados sobre eventos importantes.
- **Modularização do Código:** Adotar uma arquitetura mais modular, como MVC ou MVVM, para tornar o código mais organizado e fácil de testar.
- **Gerenciamento de Estado:** Considerar a implementação de um gerenciamento de estado robusto, como o **Redux**, para centralizar o estado da aplicação.
- **Testes Automatizados:** Implementar testes unitários e de integração para as principais funcionalidades, garantindo maior confiabilidade e manutenção a longo prazo.
  
---

## Conclusão

### Resumo das Conclusões
Este projeto tem sido uma excelente oportunidade de aprendizado, tanto para o desenvolvimento de uma aplicação mobile quanto para a aplicação de boas práticas de controle de versão e colaboração em equipe. As tecnologias utilizadas se mostraram eficientes para atender aos requisitos do projeto, mas existem oportunidades de melhoria, principalmente na parte de arquitetura e escalabilidade.

### Próximos Passos

- Publicação do aplicativo nas principais lojas de aplicativos móveis, como Google Play e App Store.
- Alinhamento pós-MVP com o cliente para ajustes, melhorias e novas funcionalidades com base no feedback recebido.
