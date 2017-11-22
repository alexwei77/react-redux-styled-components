import * as firebase from 'firebase';

// should go in a secret file
const config = {
    apiKey: "AIzaSyAPiu11g13ZyYBpuw4y-ykCQcpCbYq2raQ",
    authDomain: "agentify-candidate.firebaseapp.com",
    databaseURL: "https://agentify-candidate.firebaseio.com",
    projectId: "agentify-candidate",
    storageBucket: "",
    messagingSenderId: "865673088743"
};
firebase.initializeApp(config);

export default firebase;