import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var ref = firebase.database().ref("people");


function obtainData() {
  return new Promise((resolve, reject) => {
    let childDataArray = [];
    ref.once("value", function(s) {
      s.forEach(function(childSnapshot) {
       var childData = childSnapshot.val();
       childDataArray.push(childData);
      });
      resolve(childDataArray);
     });
  });
}

function errData(err){
  console.log(err);
}


export {database, ref, obtainData};
export {errData};
export default firebaseApp.firestore();
