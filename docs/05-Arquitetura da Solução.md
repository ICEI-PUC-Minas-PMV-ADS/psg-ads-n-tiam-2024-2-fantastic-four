# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/01-arquitetura-solucao.png)

## Modelo ER

![Modelo ER](img/01-firebase.png)

## Tecnologias Utilizadas

- **Frontend:** React Native | Typescript
- **Backend:** Node.js | Typescript
- **UI:** Material UI
- **Bibliotecas:** Axios | Redux | Magic UI | React Native Firebase | React Navigation
- **Banco de dados:** Firebase
- **Teste unitários:** JEST
- **Versionamento:** Git & Github
- **Hospedagem e deploy:** Expo

![Tecnologias Utilizadas](img/TecnologiasUtilizadas.png)

## Hospedagem

Para hospedar e lançar nosso aplicativo nas lojas de aplicativos, criaremos contas de desenvolvedor no Google Play Console e no Apple Developer Program. Utilizaremos o Expo para gerar builds de produção para Android e iOS, que serão então carregados nas respectivas plataformas. No Google Play Console, faremos o upload do arquivo AAB, preencheremos os detalhes do aplicativo e submeteremos para revisão. Na App Store, utilizaremos o App Store Connect para enviar o arquivo IPA, preencher as informações necessárias e submeter para revisão. Após a aprovação, o aplicativo estará disponível para download nas lojas de aplicativos, garantindo um processo estruturado e eficiente para o lançamento e manutenção contínua.

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.

> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
