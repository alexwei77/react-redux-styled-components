import * as firebase from 'firebase';

// should go in a secret file
const config = {
    '*******'
};
firebase.initializeApp(config);

export default firebase;