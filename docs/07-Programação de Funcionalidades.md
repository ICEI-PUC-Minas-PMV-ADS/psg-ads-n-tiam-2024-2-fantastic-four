# Programação de Funcionalidades

# SimplonBarberShop - Conexão com o Firebase

## 1. Descrição Geral da Funcionalidade
A funcionalidade implementada configura e estabelece a conexão com os serviços do Firebase, permitindo a autenticação de usuários, agendamento e gerenciamento de compromissos, além de garantir a segurança dos dados. A configuração utiliza os serviços do Firebase para autenticação, banco de dados em tempo real (Firestore) e armazenamento de arquivos.

## 2. Requisitos Funcionais Atendidos

- **RF-001** - Permitir que os usuários se cadastrem e criem perfis  
  **Artefato relacionado:** O arquivo `firebaseConnection.ts` facilita o uso do serviço de autenticação Firebase para que usuários possam se cadastrar e fazer login.  
  **Código Fonte:**
  
```typescript
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';
  export const auth = firebase.auth();
  ```

- **RF-003** - Permitir o agendamento de compromissos diretamente através do sistema  
  O Firebase Firestore será utilizado para armazenar e gerenciar dados de compromissos.  
  **Artefato relacionado:** A conexão com o Firestore permite a leitura e gravação de dados de agendamentos no sistema.  

  **Código Fonte:**
```typescript
  import firebase from 'firebase/compat/firestore';

  export const db = firebase.firestore();
```

- **RF-004** - Enviar notificações automáticas para confirmar compromissos e lembrar antes do horário marcado  
  Utilizando o Firestore, é possível integrar com um serviço de notificações, como o Firebase Cloud Messaging (FCM), para enviar lembretes automáticos.  
  **Artefato relacionado:** O arquivo `firebaseConnection.ts` pode ser expandido para incluir o FCM para enviar notificações automáticas.

- **RF-005** - Permitir cancelamento e remarcação de compromissos de forma fácil  
  A integração com o Firestore permite que os usuários alterem ou removam compromissos diretamente.  
  **Artefato relacionado:** O banco de dados em tempo real permite atualizações fáceis e rápidas.

## 3. Requisitos Não Funcionais Atendidos

- **RNF-001** - O sistema deve ser responsivo para rodar em dispositivos móveis  
  O projeto utiliza React Native e Expo, que garantem que a interface seja responsiva e compatível com dispositivos móveis, oferecendo uma ótima experiência de usuário.

- **RNF-003** - As informações dos usuários devem ser armazenadas e transmitidas de forma segura  
  O Firebase Auth oferece autenticação segura e utiliza SSL para a transmissão segura dos dados, atendendo a este requisito.

- **RNF-005** - O sistema deve estar disponível 24/7  
  O Firebase é uma plataforma gerenciada que oferece alta disponibilidade, garantindo que o sistema esteja disponível a qualquer momento.

- **RNF-007** - O sistema deve ser escalável para suportar um aumento no número de usuários e dados  
  O Firebase Firestore e Auth são projetados para escalabilidade, permitindo o crescimento do número de usuários e dados sem grandes alterações na infraestrutura.

## 4. Artefatos Criados
- **Arquivo:** `firebaseConnection.ts`  
  Este arquivo contém a configuração e inicialização do Firebase, garantindo a integração com serviços como Autenticação, Firestore e Storage para suportar as funcionalidades principais da barbearia.

## 5. Estruturas de Dados Utilizadas
- **FirebaseConfig:** Um objeto contendo as credenciais necessárias para inicializar a aplicação no Firebase.
- **Firebase Services:** Os seguintes serviços do Firebase são utilizados:
  - **Auth:** Para autenticação segura de usuários (suporta login por e-mail/senha e provedores OAuth).
  - **Firestore:** Para armazenamento de dados em tempo real, como perfis de usuários e agendamentos.
  - **Storage:** Para armazenamento de arquivos, como fotos de perfil.

## 6. Hospedagem:
Para hospedar a aplicação, utilize o **Firebase Hosting** ou faça build de produção com **Expo EAS**.

## 7. Ambiente de Hospedagem
O projeto será desenvolvido e testado utilizando **Expo**, facilitando o desenvolvimento mobile. O **Firebase Hosting** ou outros serviços gerenciados do Firebase serão utilizados para disponibilizar a aplicação.

# SimplonBarberShop - Autenticação

```typescript
  export const signIn = async (email: string, password: string) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const uid = response.user?.uid;

    if (!uid) {
      throw new Error("UID não encontrado");
    }

    const userProfile = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();

    if (!userProfile.exists) {
      throw new Error("Usuário não encontrado no Firestore");
    }
    return true;
  } catch (error: any) {
    switch (error.code) {
      case "auth/user-not-found":
        alert("Usuário não encontrado.");
        break;
      case "auth/wrong-password":
        alert("Senha incorreta.");
        break;
      case "auth/invalid-email":
        alert("E-mail inválido.");
        break;
      case "auth/user-disabled":
        alert("Usuário desativado.");
        break;
      default:
        alert("Ocorreu um erro desconhecido. Tente novamente mais tarde.");
    }
    return error;
  }
};

export const signUp = async (
  email: string,
  password: string,
  nome: string,
  dataNascimento: string,
  telefone: string,
  tipo: string
) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const uid = response.user?.uid;
    await firebase.firestore().collection("users").doc(uid).set({
      nome,
      dataNascimento,
      telefone,
      email,
      tipo,
      created_at: new Date(),
    });
    alert("Cadastro realizado com sucesso!");
  } catch (error: any) {
    switch (error.code) {
      case "auth/email-already-in-use":
        alert("Este e-mail já está em uso.");
        break;
      case "auth/invalid-email":
        alert("E-mail inválido.");
        break;
      case "auth/operation-not-allowed":
        alert("Operação não permitida.");
        break;
      case "auth/weak-password":
        alert("A senha é muito fraca.");
        break;
      default:
        alert("Ocorreu um erro desconhecido. Tente novamente mais tarde.");
    }
  }
};
  ```

# SimplonBarberShop - Agendamentos

```typescript
async function handleSubmit() {
    if (!selectedBarber || !selectedService || !selectedTime) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }
    if (user) {
      const payload = {
        day: selectedTime.date,
        time: selectedTime.time,
        idUser: user.uid,
        idBarber: selectedBarber.barberId,
        services: [selectedService],
        products: [],
        totalPrice: selectedService.price || 0,
        status: "pending",
      };

      try {
        await firebase
          .firestore()
          .collection("schedullings")
          .doc()
          .set(payload);
        Alert.alert("Sucesso", "Agendamento concluído com sucesso!");
      } catch (e) {
        Alert.alert("Erro", "Erro ao salvar agendamento");
      }
      router.push("/home");
    }
  }
  ```
