
import { getDatabase,ref,push,set,onValue,get,runTransaction } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword,signOut,GoogleAuthProvider, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"
import { getDownloadURL, uploadBytes,getStorage,ref as Sref } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';


const provider = new GoogleAuthProvider();
const inputField = document.getElementById("Institute");
const autocompleteList = document.getElementById("autocomplete-list");
const inputField2 = document.getElementById("Institute2");
const autocompleteList2 = document.getElementById("autocomplete-list2");
const dataUrl = "https://raw.githubusercontent.com/Shibbu264/iitbhumun/newbegin/data/newdata.json"
 document.addEventListener("click", event => {
  const targetElement = event.target;
  if (!targetElement.closest("#autocomplete-list")) {
   
    closeAutocompleteList();
  }
  if (!targetElement.closest("#autocomplete-list2")) {
   
    closeAutocompleteList2();
  }
});;
const closeAutocompleteList = () => {
  autocompleteList.innerHTML = "";
};
const closeAutocompleteList2 = () => {
  autocompleteList2.innerHTML = "";
};

fetch(dataUrl)  // Adjust the path to include the 'data' folder
  .then(response => response.json())
  .then(data => {
    const instituteData = data.Institute;


  // document.addEventListener("click", event => {
  //   const targetElement = event.target;
  //   if (!targetElement.closest("#autocomplete-list")) {
     
  //     closeAutocompleteList();
  //   }
  // });
    inputField.addEventListener("input", function() {
      const inputValue = inputField.value.toUpperCase();
      
      autocompleteList.innerHTML = "";
     
      const matchingColleges1 = instituteData.filter(institute => {

        return institute.includes(inputValue);

      });
     

      matchingColleges1.forEach(institute => {
        if (inputValue.length>0){
        const suggestion = document.createElement("div");
        suggestion.textContent = institute;
        suggestion.addEventListener("click", function() {
          inputField.value = this.textContent;
          autocompleteList.innerHTML = "";
          
        });
        autocompleteList.appendChild(suggestion);
       
      }});
    
    });
    inputField2.addEventListener("input", function() {
      const inputValue2 = inputField2.value.toUpperCase();
      
      autocompleteList2.innerHTML = "";
     
    
      const matchingColleges2 = instituteData.filter(institute => {

        return institute.includes(inputValue2);

      });

      matchingColleges2.forEach(institute => {
        if (inputValue2.length>0){
        const suggestion = document.createElement("div");
        suggestion.textContent = institute;
        suggestion.addEventListener("click", function() {
          inputField2.value = this.textContent;
          autocompleteList2.innerHTML = "";
          
        });
        autocompleteList2.appendChild(suggestion);
       
      }});
    
    });




















  });
  


const firebaseConfig = {
  apiKey: "AIzaSyAYLIn8hGjgVrX3h23aVZPx47Sn8bZBCz4",
  authDomain: "mun-2023.firebaseapp.com",
  databaseURL: "https://mun-2023-default-rtdb.firebaseio.com",
  projectId: "mun-2023",
  storageBucket: "mun-2023.appspot.com",
  messagingSenderId: "843433332162",
  appId: "1:843433332162:web:faa917397b259754461a5b",
  measurementId: "G-L3C80FWLKS"
};
function generateReferralCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = 8;
  let referralCode = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralCode += characters.charAt(randomIndex);
  }

  return referralCode;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const generateUniqueId = () => {
  const prefix = 'ID'; 
  const timestamp = new Date().getTime(); 
  const random = Math.floor(Math.random() * 10000); 
  
  
  const uniqueId = `${prefix}_${timestamp}_${random}`;
  
  return uniqueId;
};

function uploadPhoto() {
  const storage = getStorage(app);
  const fileInput = document.getElementById('photoInput');
  const file = fileInput.files[0];
console.log(file)
  if (!file) {
    console.error('No file selected.');
    return;
  }
const id=generateUniqueId()
  // Create a unique filename for the photo (you can use the current timestamp or any other method)
  const photoRef = Sref(storage, `photos/${id}${file.name}`);

  // Upload the file to Firebase Storage
  uploadBytes(photoRef, file).then((snapshot) => {
    // Get the download URL of the uploaded photo
    
    getDownloadURL(photoRef).then((downloadURL) => {
    
      console.log('Photo URL:', downloadURL);
      
      localStorage.setItem("url",downloadURL)
      
      
    }).catch((error) => {
      console.error('Error getting download URL:', error);
    });
  }).catch((error) => {
    console.error('Error uploading photo:', error);
  });
}
function uploadPhoto2() {
  const storage = getStorage(app);
  const fileInput = document.getElementById('photoInput2');
  const file = fileInput.files[0];
console.log(file)
  if (!file) {
    console.error('No file selected.');
    return;
  }
const id=generateUniqueId()
  // Create a unique filename for the photo (you can use the current timestamp or any other method)
  const photoRef = Sref(storage, `photos/${id}${file.name}`);

  // Upload the file to Firebase Storage
  uploadBytes(photoRef, file).then((snapshot) => {
    // Get the download URL of the uploaded photo
    
    getDownloadURL(photoRef).then((downloadURL) => {
    
      console.log('Photo URL:', downloadURL);
      
      localStorage.setItem("url2",downloadURL)
      
      
    }).catch((error) => {
      console.error('Error getting download URL:', error);
    });
  }).catch((error) => {
    console.error('Error uploading photo:', error);
  });
}
if(document.getElementById("number").value==""){document.getElementById("number").value="+91"}

const database=getDatabase(app)

function validateForm() {
  const name = document.getElementById('name_field').value.trim();
  const name2 = document.getElementById('name_field2').value.trim();
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const institute = document.getElementById('Institute').value.trim();
  const region = document.getElementById('region').value.trim();
  const email = document.getElementById('email_field').value.trim();
  const password = document.getElementById('password').value.trim();
const muncount=document.getElementById('muncount').value.trim();
const age2 = document.getElementById('age2').value;
const gender2 = document.getElementById('gender2').value;
const institute2 = document.getElementById('Institute2').value.trim();
const region2 = document.getElementById('region2').value.trim();
const email2 = document.getElementById('email_field2').value.trim();

const muncount2=document.getElementById('muncount2').value.trim();
if(name2!=''){
  if (muncount2 === '') {
    alert('Please enter the number of MUN you participated before!.');
    return false;
  }


  if (age2 === '') {
    alert('Please enter your age.');
    return false;
  }

  if (gender2 === '') {
    alert('Please select your gender.');
    return false;
  }

  if (institute2 === '') {
    alert('Please enter the name of your institution.');
    return false;
  }

  if (region2 === '') {
    alert('Please enter your region (city or state).');
    return false;
  }

  if (email2 === '') {
    alert('Please enter your email.');
    return false;
  }

  // Email validation using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email2)) {
    alert('Please enter a valid email address.');
    return false;
  }

  

  return true;



}
  if (name === '') {
    alert('Please enter your name.');
    return false;
  }
  if (muncount === '') {
    alert('Please enter the number of MUN you participated before!.');
    return false;
  }


  if (age === '') {
    alert('Please enter your age.');
    return false;
  }

  if (gender === '') {
    alert('Please select your gender.');
    return false;
  }

  if (institute === '') {
    alert('Please enter the name of your institution.');
    return false;
  }

  if (region === '') {
    alert('Please enter your region (city or state).');
    return false;
  }

  if (email === '') {
    alert('Please enter your email.');
    return false;
  }

  // Email validation using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  if (password === '') {
    alert('Please enter your password.');
    return false;
  }

  return true;
}
// submitForm1 ko add kar dena jab delegate registration open ho
    document.getElementById('register2').addEventListener("click",submitForm1);
    document.getElementById('register3').addEventListener("click", submitForm2);

   


function getInput(id) {
    let abc= document.getElementById(id).value;
   
    return abc
}

function submitForm1(e) {
  
document.getElementById('form2').addEventListener("submit",function(e){e.preventDefault()})
   let abcd=validateForm()
 
if(abcd){
  document.getElementById('register2').innerHTML=`<i class="fa fa-circle-o-notch fa-spin mx-2"> </i> Loading...`
    e.preventDefault();
    
    saveRec1(getInput('name_field'), getInput('number'),getInput('email_field'), getInput('age'),getInput('gender'),getInput('Institute'),getInput('region'),getInput('muncount'),getInput('pastaward'),getInput('refferalcode'),getInput('Committee1'),getInput('pref1option1'),getInput('pref1option2'),getInput('pref1option3'),getInput('Committee2'),getInput('pref2option1'),getInput('pref2option2'),getInput('pref2option3'),getInput('Committee3'),getInput('pref3option1'),getInput('pref3option2'),getInput('pref3option3'),getInput('name_field2'),getInput('number2'), getInput('email_field2'), getInput('age2'),getInput('gender2'),getInput('Institute2'),getInput('region2'),getInput('muncount2'),getInput('pastaward2'),getInput('refferalcode2'));
    
  }
    
   
}
function submitForm2(e) {
  document.getElementById('form2').addEventListener("submit",function(e){e.preventDefault()})
 if( validateForm()){
  document.getElementById('register3').innerHTML=`<i class="fa fa-circle-o-notch fa-spin mx-2"> </i> Loading...`
  e.preventDefault();
  
  saveRec2(getInput('name_field'),getInput('number'), getInput('email_field'), getInput('age'),getInput('gender'),getInput('Institute'),getInput('region'),getInput('muncount'),getInput('pastaward'),getInput('refferalcode'),getInput('Committee1'),getInput('pref1option1'),getInput('pref1option2'),getInput('pref1option3'),getInput('Committee2'),getInput('pref2option1'),getInput('pref2option2'),getInput('pref2option3'),getInput('Committee3'),getInput('pref3option1'),getInput('pref3option2'),getInput('pref3option3'));
 
}
 
}
function saveRec1(name,number,email,age,gender,Institute,region,muncount,pastaward,refferalcode,Committee1,pref1option1,pref1option2,pref1option3,Committee2,pref2option1,pref2option2,pref2option3,Committee3,pref3option1,pref3option2,pref3option3,name2,number2,email2,age2,gender2,Institute2,region2,muncount2,pastaward2,refferalcode2) {
    const uuid=generateUniqueId()
    console.log(uuid)
  
    const snapshot = get(ref(database, "preferences/"))
    .then((snapshot) => {
      const data = snapshot.val();
console.log(data.length)
    
      let i=0;
      for (const itemId in data) {
       
        const item = data[itemId];
        if (item.email === email) {
          alert("Email already exists!")
          document.getElementById('register2').innerHTML=`Single Delegate`
          i=1;
          break;
        }}
        if(i==0){ if(refferalcode!=null){
          const snapshot = get(ref(database, "Referral_program/"))
            .then((snapshot) => {
              const data = snapshot.val();
            
              const filteredData = [];
              for (const itemId in data) {
                const item = data[itemId];
                if (item.referralCode === refferalcode) {
                  const entryId = itemId;
                  const userRegisteredRef = ref(database,"Referral_program/"+entryId+"/"+"UserRegistered");
        
                  runTransaction(userRegisteredRef, (userRegistered) => {
                    return (userRegistered || 0) + 1; // Increment the count by 1
                  })
                    .then(() => {
                     
                      console.log('UserRegistered count incremented successfully');
                    })
                    .catch((error) => {
                      console.error('Error incrementing UserRegistered count:', error);
                    });
                }
              }})
    
      }
      const dbRef1 = ref(database, "records of single delegates/"+uuid);
       
        const newRec = push(dbRef1);
        
        set(newRec, {
          name:name,
          email:email,
          Phone_number:number,
          Committee_Preference_1: Committee1,
          Committee_Preference_2: Committee2,
          Committee_Preference_3: Committee3,
          Age:age,
          Gender:gender,
          Institute:Institute,
          Region:region,
          MUNcount:muncount,
          PastAwards:pastaward,
          Referralcode:refferalcode,
    
        })
        const option1=Committee1+": "+pref1option1;
      const option2=Committee1+":  "+pref1option2;
      const option3=Committee1+":  "+pref1option3;
      const option4=Committee2+":  "+pref2option1;
      const option5=Committee2+":  "+pref2option2;
      const option6=Committee2+":  "+pref2option3;
      const option7=Committee3+":  "+pref3option1;
      const option8=Committee3+":  "+pref3option2;
      const option9=Committee3+":  "+pref3option3;
    
      const fileInput = document.getElementById('photoInput');
      const file = fileInput.files[0];
      const fileInput2 = document.getElementById('photoInput2');
      const file2 = fileInput2.files[0];
     
      if(file){uploadPhoto()}
      if(file2){uploadPhoto2()}
      console.log(localStorage.getItem("url"))
      const hehe=ref(database,"preferences/")
      
      const titu=push(hehe);
      if(name2!=''){
        
        set(titu,{
        Registration_type:"Double Delegates",
        name:name,
        Phone_number:number,
        alloted:"NO" ,
        email,
        Age:age,
        Gender:gender,
        Institute:Institute,
        Institute_ID:`${localStorage.getItem("url")}`,
        Delegate_type:"Outstation",
        Payment_done:"NO",
        PaymentSS:"",
        Region:region,
        Referralcode:refferalcode,
        MUNcount:`Number_of_MUNs_appeared_before: ${muncount}`,
        PastAwards:` PastAwards_won: ${pastaward}`,
        option1,option2,option3,option4,option5,option6,option7,option8,option9,
        p_name2:name2,
        p_Phone_number_2:number2,
        p_email2:email2,
        p_Age2:age2,
        p_Gender2:gender2,
        p_Institute2:Institute2,
        p_Institute_ID2:`${localStorage.getItem("url2")}`,
        p_Region2:region2,
        p_Referralcode2:refferalcode2,
        p_MUNcount2:`Number_of_MUNs_appeared_before: ${muncount2}`,
        p_PastAwards2:` PastAwards_won: ${pastaward2}`,
    
    
    
    
    
    
    
      }) .then(() => {
        localStorage.removeItem("url"),
        localStorage.removeItem("url2"),
        signup1(); 
        
         
        
        
            
          
        
        
       
      }).then(() => {
        // Registration and signup successful
        document.getElementById("registrationForm").reset();
        document.getElementById("form2").reset();
        
        
      })
      
      .catch((error) => {
        
        alert("Registration failed: " + error.message);
        document.getElementById('register2').innerHTML=`Double Delegate`
      });}
      else{
      set(titu,{
        Registration_type:"Single Delegates",
        name:name,
        Phone_number:number,
        alloted:"NO" ,
        email,
        Age:age,
        Gender:gender,
        Institute:Institute,
        Institute_ID:`${localStorage.getItem("url")}`,
        Delegate_type:"Outstation",
        Payment_done:"NO",
        PaymentSS:"",
        Region:region,
        Referralcode:refferalcode,
        MUNcount:`Number_of_MUNs_appeared_before: ${muncount}`,
        PastAwards:` PastAwards_won: ${pastaward}`,
        option1,option2,option3,option4,option5,option6,option7,option8,option9,
        
    
    
    
    
    
    
      })
      
      
        
        
        
        .then(() => {
          localStorage.removeItem("url"),
          localStorage.removeItem("url2"),
          signup1(); 
          
           
          
          
              
            
          
          
         
        }).then(() => {
          // Registration and signup successful
          document.getElementById("registrationForm").reset();
          document.getElementById("form2").reset();
          
          
        })
        
        .catch((error) => {
          
          alert("Registration failed: " + error.message);
          document.getElementById('register2').innerHTML=`Single Delegate`
        });
       
      }
    
    }
      })
      
   
}

function saveRec2(name,number,email,age,gender,Institute,region,muncount,pastaward,refferalcode,Committee1,pref1option1,pref1option2,pref1option3,Committee2,pref2option1,pref2option2,pref2option3,Committee3,pref3option1,pref3option2,pref3option3) {
 
  const snapshot = get(ref(database, "preferences/"))
  .then((snapshot) => {
    const data = snapshot.val();
let i=0;
console.log(data.length)
    
    for (const itemId in data) {
      const item = data[itemId];
     
      if (item.email === email) {
        alert("Email already exists!")
        document.getElementById('register3').innerHTML=`Campus ambassador`
        i=1;
        break;
       
      }}
      
      if(i==0){
        const uuid=generateUniqueId()
        const Reff =generateReferralCode();
        
        const abcd=ref(database,"Referral_program/")
      localStorage.setItem("value",Reff)
      const refrec=push(abcd)
      set(refrec,{
    Name:name,
    Number:number,
    email:email,
    referralCode:Reff,
    UserRegistered:0,
    PaymentConfirmed:0
    
      })
    //To increase referral count
      if(refferalcode!=null){
          const snapshot = get(ref(database, "Referral_program/"))
            .then((snapshot) => {
              const data = snapshot.val();
            
              const filteredData = [];
              for (const itemId in data) {
                const item = data[itemId];
                if (item.referralCode === refferalcode) {
                  const entryId = itemId;
                  const userRegisteredRef = ref(database,"Referral_program/"+entryId+"/"+"UserRegistered");
        
                  runTransaction(userRegisteredRef, (userRegistered) => {
                    return (userRegistered || 0) + 1; 
                  })
                    .then(() => {
                      console.log('UserRegistered count incremented successfully');
                    })
                    .catch((error) => {
                      console.error('Error incrementing UserRegistered count:', error);
                    });
                }
              }})
      
      
      
       
    
    
      }
      const dbRef2 = ref(database, "records of Conference ambassadors/"+uuid);
      
      const newRec = push(dbRef2);
      set(newRec, {
        name:name,
        Phone_number:number,
        email:email,
        Committee_Preference_1: Committee1,
        Committee_Preference_2: Committee2,
        Committee_Preference_3: Committee3,
        Age:age,
        Gender:gender,
        Institute:Institute,
        Region:region,
        MUNcount:muncount,
        PastAwards:pastaward,
        Referralcode:refferalcode,
        
    
      },)
      const option1=Committee1+":  "+pref1option1;
      const option2=Committee1+":  "+pref1option2;
      const option3=Committee1+":  "+pref1option3;
      const option4=Committee2+":  "+pref2option1;
      const option5=Committee2+":  "+pref2option2;
      const option6=Committee2+":  "+pref2option3;
      const option7=Committee3+":  "+pref3option1;
      const option8=Committee3+":  "+pref3option2;
      const option9=Committee3+":  "+pref3option3;
      const fileInput = document.getElementById('photoInput');
      const file = fileInput.files[0];
      if(file){uploadPhoto()}
      console.log(localStorage.getItem("url"))
      const hehe=ref(database,"preferences/")
      const titu=push(hehe);
      
      set(titu,{
        Registration_type:"Campus Ambassador",
        name:name,
        Phone_number:number,
        alloted:"NO" ,
        email,
        Age:age,
        Gender:gender,
        Institute:Institute,
        Institute_ID:`${localStorage.getItem("url")}`,
        Delegate_type:"Outstation",
        Payment_done:"NO",
        PaymentSS:"",
        Region:region,
        Referralcode:refferalcode,
        MUNcount:`Number_of_MUNs_appeared_before: ${muncount}`,
        PastAwards:` PastAwards_won: ${pastaward}`,
        option1,option2,option3,option4,option5,option6,option7,option8,option9,
    
    
    
    
    
    
    
    
    
      })
      
      
      
      
      
      
      
      
      
      
      
      
      
      .then(() => {
        signup2(); 
          
           
            
              
        
        
      })
      .then(() => {
        // Registration and signup successful
        document.getElementById("registrationForm").reset();
        document.getElementById("form2").reset();
        
        
      })
      .catch((error) => {
        
        alert("Registration failed: " + error.message);
        document.getElementById('register3').innerHTML=`Conference ambassador`
      });
  
    
    }})
   
 
}






  
  








  function signup1(){
    var email1 = document.getElementById("email_field").value;
   
    console.log(email1)
    var password1=document.getElementById("password").value
    console.log(password1)
  createUserWithEmailAndPassword(auth,email1,password1)
    .then((userCredential) => {
      console.log(email1)
      const user = userCredential.user;
      const user1 = auth.currentUser; 
     
     
       
      document.getElementById("qt").innerHTML="<div class='container1'><div class='loader'></div></div>",
     
       setTimeout(()=>{window.location.replace("/thankyou")
     
   
     
     },2000)
        
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('register2').innerHTML=`Single Delegate` 
      alert(errorMessage);
      
      
      // ..
    });}
    function signup2(){
      var email2 = document.getElementById("email_field").value;
      var password2=document.getElementById("password").value;
    createUserWithEmailAndPassword(auth,email2,password2)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
       
      
     
       document.getElementById("qt").innerHTML="<div class='container1'><div class='loader'></div></div>",
      
     
       setTimeout(()=>{window.location.replace("/thankyouforCA")},2000)
       
      
  })
      .catch((error) => {
        
        const errorMessage = error.message;
        document.getElementById('register3').innerHTML=`Single Delegate`
        alert(errorMessage);
        // ..
      });}

      document.getElementById("google").addEventListener("click", function(){ console.log("")
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
     
        alert(`Hello ${auth.currentUser.displayName}, Complete the registration form now`)
        // IdP data available using getAdditionalUserInfo(result)
        document.getElementById("google").style.display=("none")
        document.getElementById("or").innerHTML=`Hello ${auth.currentUser.displayName}  `
        document.getElementById("or").style.color="#189BA5" 
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        alert("Server error ocurred.")
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      })
    })
       


