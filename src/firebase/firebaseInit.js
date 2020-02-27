import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = firebase.database().ref("people");
const db = firebase.firestore();

function obtainData() {
  return new Promise((resolve, reject) => {
    let childDataArray = [];
    db.collection('people').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        childDataArray.push(doc.data());
      });
      resolve(childDataArray);
    })
  });
}

function errData(err){
  console.log(err);
}

export {database, ref, obtainData, addPerson};
export {errData};
export default firebaseApp.firestore();
