import firebase from "firebase";
import fs from "fs";
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  auth: {
    user: 'mikolottoiaeste@gmail.com',
    pass: 'krowmikolaj123'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// app.use(express.urlencoded({
//   extended: true
// }));
// app.use(cors({
//   origin: true
// }));

//app.get('/',(req,res) => res.send('Hello world!'));

// app.post('/', function(req,res){

//   //"opcje admina" - odpalenie funkcji losującej osoby
//   if(req.body.email === 'witold.serwatka@iaeste.pl' && req.body.wish === 'dawaj'){
//     mailsender();
//     res.send('Loteria poszła.');
//     return;
//   }

//   //walidacja serwerowa - do zmiany w wersji 2.0
//   if(req.body.email === '' || req.body.wish === '' || req.body.email.search('@iaeste.pl') === -1){
//     res.send('Nieprawidłowe dane.');
//     return;
//   }

//   for(var i = 0; i < jsonData.wishes.length; i++){
//     if(jsonData.wishes[i].email === req.body.email){
//       var isInList = true;
//       jsonData.wishes[i].wish = req.body.wish;
//     }
//   }

//   if(!isInList){
//       var obj = {
//         email: req.body.email,
//         wish: req.body.wish,
//         santaMail: ''
//       };
//       jsonData.wishes.push(obj);
//   }

//   var newJsonData = JSON.stringify(jsonData);
//   fs.writeFileSync('./wish.json',newJsonData);

//   var mailOptions = {
//     from: 'mikolotto@pm.me',
//     to: req.body.email,
//     subject: '[Mikolotto] Twój list został wysłany!',
//     text: 'Ho, ho, ho! \n Twój list:\n ' + req.body.wish + '\n jest już w drodze na biegun północny! Pamiętaj jednak, że aby otrzymać swój prezent, musisz pomóc świętemu Mikołajowi dostarczyć komuś jego prezent. Oczekuj dalszych rozkazów. \n Św. M'
//   }

//   transporter.sendMail(mailOptions, function(error,info){
//     if(error){
//       console.log(error);
//     }else{
//       console.log('Email sent: ' + info.response);
//     }
//   });

//   console.log(req.body.email);
//   console.log(req.body.wish);

//   res.send("List do świętego mikołaja został wysłany!");
// });

// // exports.widgets = functions.https.onRequest(app);
// app.listen(port,() => console.log(`Example app listening on port ${port}!`));

//stworzyć kopię przed odpaleniem!
mailsender();
async function mailsender(){
  var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCO5jiiXLYgyjmncqqtpjR7ouGkZnzdqsU",
    authDomain: "mikolotto-iaeste-6e272.firebaseapp.com",
    projectId: "mikolotto-iaeste-6e272",
    storageBucket: "mikolotto-iaeste-6e272.appspot.com",
    messagingSenderId: "694198623102",
    appId: "1:694198623102:web:e3d38a7e8fe3a47f16312f",
    measurementId: "G-97C9T1WCCB"
  })
    const jsonData = {wishes : []}
    var db = firebaseApp.firestore();
  const wishesRef = db.collection('wishes');
  const snapshot = await wishesRef.get();
  snapshot.forEach(doc => {
  let d = doc.data();
  d["santaMail"] = '';
  jsonData.wishes.push(d);
});
  console.log(jsonData);
  var totalWishes = jsonData.wishes.length;
//uwaga tu się będą odkurwiać niezłe kody
  for(var i = 0; i < totalWishes ; i++){
    var hash = Math.floor(Math.random()*totalWishes);

    for(var j = 0; j < totalWishes ; j++){  //proste hashowanie z liniowym rozwiązywaniem konfliktów
      if(jsonData.wishes[hash].email === jsonData.wishes[i].email || jsonData.wishes[hash].santaMail !== ''){
        console.log(hash);
        hash = (hash+1)%totalWishes;
      }
      else{
        jsonData.wishes[hash].santaMail = jsonData.wishes[i].email;
        break;
      }
    }
    //debug
    console.log(i + ' przypisano do ' + hash);
  }

  //pętla sprawdzająca to gunwo
  for(var i = 0; i<totalWishes ; i++){
    if(jsonData.wishes[i].email === jsonData.wishes[i].santaMail || jsonData.wishes[i].email === ''){
      jsonData.wishes[i].santaMail = jsonData.wishes[(i+1)%totalWishes].santaMail;
    }
  }

  //zapisz wyniki loterii
  var newJsonData = JSON.stringify(jsonData);
  fs.writeFileSync('./wish.json', newJsonData);

  //wysylanie maili do mikolajow
  // for(var i = 0; i < totalWishes; i++){
  //   var name = jsonData.wishes[i].name();
  //   name = name.replace('.',' ');

  //   var mailOptions = {
  //     from: 'mikolotto@pm.me',
  //     to: jsonData.wishes[i].santaMail,
  //     subject: '[Mikolotto] Zadanie od św. M!',
  //     text: 'Ho, ho, ho! \nElfie/Elfko czeka przed tobą zadanie.\nW tegorocznym mikollotto wylosowałeś/aś:\n ' + name + '. Z życzeniem: \n' + jsonData.wishes[i].wish + '\nPrezent przynieś na wigilijkę. \nPowodzenia!\nŚw. M'
  //   };

    // transporter.sendMail(mailOptions, function(error,info){
    //   if(error){
    //     console.log(error);
    //   }else{
    //     console.log('Email sent: ' + info.response);
    //   }
    // });

 //}
 }
