import firebase from 'firebase/compat/app';
import firebaseConnection from './firebaseConnection'; // Ajuste o caminho conforme necessário

jest.mock('firebase/compat/app', () => {
  return {
    initializeApp: jest.fn(), // Mock da função initializeApp
    auth: jest.fn().mockReturnValue({
      signInWithEmailAndPassword: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
    }),
    firestore: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          set: jest.fn(),
          get: jest.fn(),
          delete: jest.fn(),
        }),
      }),
    }),
    storage: jest.fn(),
  };
});

describe('Firebase Connection', () => {
  test('should initialize Firebase with the correct configuration', () => {
    const firebaseConfig = {
      apiKey: "AIzaSyDHMVm8FkTWn27Od6CJrVGHjHaB7ofSjrk",
      authDomain: "simplonbarbershop.firebaseapp.com",
      projectId: "simplonbarbershop",
      storageBucket: "simplonbarbershop.appspot.com",
      messagingSenderId: "724001305962",
      appId: "1:724001305962:web:5b93a20e9f9bd008c62113",
      measurementId: "G-B5B9DX8BYP"
    };

    // Isso inicializa o Firebase (o que irá chamar o mock do initializeApp)
    firebaseConnection;

    // Verifica se o método initializeApp foi chamado com a configuração correta
    expect(firebase.initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });
});