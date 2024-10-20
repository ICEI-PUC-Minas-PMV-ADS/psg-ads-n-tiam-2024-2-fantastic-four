import firebase from './firebaseConnection';

export const signIn = async (email: string, password: string) => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      const uid = response.user?.uid;

      if (!uid) {
        throw new Error("UID não encontrado");
      }

      const userProfile = await firebase.firestore().collection('users').doc(uid).get();

      if (!userProfile.exists) {
        throw new Error("Usuário não encontrado no Firestore");
      }
      return true;

    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      return error;
    }
  };

  export const signUp = async (email: string, password: string, nome: string, dataNascimento: string, telefone: string, tipo: string) => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = response.user?.uid;
      await firebase.firestore().collection('users').doc(uid).set({
        nome,
        dataNascimento,
        telefone,
        email,
        tipo,
        created_at: new Date(),
      });

    } catch (error) {

    }

  };


export const getUserProfile = async (uid: string) => {
  try {
    const userProfile = await firebase.firestore().collection('users').doc(uid).get();
    if (userProfile.exists) {
      return userProfile.data();
    } else {
      throw new Error("Usuário não encontrado no Firestore");
    }
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw error;
  }
};


  export const signOut = async () => {
    await firebase.auth().signOut();
  };