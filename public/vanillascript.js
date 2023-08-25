import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"
import { getDatabase, ref, push, set, get, onValue, update,runTransaction } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDownloadURL, uploadBytes,getStorage,ref as Sref } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';
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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

async function fetchData2(data) {
  try {
    const response = await fetch('https://mun-2023-default-rtdb.firebaseio.com/Referral_program.json');
    const data = await response.json();
    
    return data
  } catch (error) {
    console.error('Error:', error);
  }
}





function  uploadPhoto() {
  const storage = getStorage(app);
  const fileInput = document.getElementById('photoInput1');
  const file = fileInput.files[0];
console.log(file)
  if (!file) {
    console.error('No file selected.');
    return;
  }

  // Create a unique filename for the photo (you can use the current timestamp or any other method)
  const photoRef = Sref(storage, `paymentss/${Date}${file.name}`);

  // Upload the file to Firebase Storage
  uploadBytes(photoRef, file).then((snapshot) => {
    // Get the download URL of the uploaded photo
    
    getDownloadURL(photoRef).then((downloadURL) => {
    
      console.log('Photo URL:', downloadURL);
      
      localStorage.setItem("url1",downloadURL)
      addphoto()
      
    }).catch((error) => {
      console.error('Error getting download URL:', error);
    });
  }).catch((error) => {
    console.error('Error uploading photo:', error);
  });
}
document.getElementById("ssbutton").addEventListener("click",uploadPhoto)
function addphoto(){

  document.getElementById('ssbutton').innerHTML=`<i class="fa fa-circle-o-notch fa-spin mx-2"> </i> Uploading...`
  const databaseRef = ref(database, "preferences");
  const auth = getAuth();
  // Retrieve the data once
  get(databaseRef)
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {

        const data = childSnapshot.val();


        if (data.email === auth.currentUser.email) {


          // Get the reference to the specific data using the child snapshot key
          const dataRef = ref(database, `preferences/${childSnapshot.key}`);

          // Update the value using the reference and the updated data
          update(dataRef, {
PaymentSS:localStorage.getItem("url1"),

           












          })
            .then(() => {
              
              document.getElementById("afterpayment").innerHTML="<h1 class='text-2xl text-center font-semibold'>We have received your payment screenshot,We will verify and update the portal soon.</h1>"
            })
            .catch((error) => {

              alert("Error Updating Data!")
document.getElementById('ssbutton').innerHTML=`Upload`
            });
        }
      });
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

}

document.getElementById("reffbutton").addEventListener("click",function(){
 

updatedata2()
  
})






































// Initialize Firebase


const userEmail = auth.currentUser ? auth.currentUser.email : "shivanshu264@gmail.com";

// Function to filter data based on user email
const filterDataByUserEmail = (data) => {
  const filteredData = Object.values(data).filter((item) => {
    const delegateData = Object.values(item);
    return delegateData.some((nestedItem) => {
      return nestedItem.email === auth.currentUser.email;
    });
  });
  return filteredData;
};

// Function to fetch data from the database
function fetchData() {
  return new Promise((resolve, reject) => {
    let data1, data2;
    const Ref1 = ref(database, "records of Conference ambassadors/");
    onValue(Ref1, (snapshot) => {
      data1 = snapshot.val();
      const filteredData1 = filterDataByUserEmail(data1);
      if (filteredData1.length > 0) {
        resolve(filteredData1);
      }
    });

    const Ref2 = ref(database, "records of single delegates/");
    onValue(Ref2, (snapshot) => {
      data2 = snapshot.val();
      const filteredData2 = filterDataByUserEmail(data2);
      if (filteredData2.length > 0) {
        resolve(filteredData2);
      }
    });
    
  });
}
document.getElementById("content").innerHTML = "<div class='loader m-auto'></div>",
 
fetchData()
  .then((DATA) => {
    
    document.getElementById("showbutton1").style.display = "inline"
    document.getElementById("progressvalue1").style.display="block"
    document.getElementById("progressvalue3").style.display="inline-block"
    document.getElementById("paymentqr").style.display="inline"

    


    DATA.map((item) => {

      const delegateData = Object.values(item);

      const nestedItem = delegateData.find((item) => item.email === auth.currentUser.email);
      localStorage.setItem("name",`${nestedItem.name}`)
      document.getElementById("content").classList.add('animatecontent');
      document.getElementById("content").innerHTML = `
     
            <ul class='datacard rounded-lg sm:px-8 px-24  bg-red-500 mb-6 w-fit mx-auto block  ' >
            
            <img src="images/profileicon.png" class="inline mx-auto w-40 h-40 rounded-full"></img>
           <li class="mb-6 text-2xl mx-6 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Name:  ${nestedItem.name} </li>
           <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Age: ${nestedItem.Age} </li>
           <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Gender:  ${nestedItem.Gender} </li>
           <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Institute:  ${nestedItem.Institute} </li>
           <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Number of MUN appeared before:  ${nestedItem.MUNcount} </li>
           <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Region: ${nestedItem.Region} </li>
           <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"> Email: ${nestedItem.email} </li>
          <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Phone Number:${nestedItem.Phone_number}
           </ul>
           <div class='selectedportfolio'>
          
           </div>
           `;
     
       




    })

  })



function fetchData1() {
  const snapshot = get(ref(database, "preferences/"))
    .then((snapshot) => {
      const data = snapshot.val();

      const filteredData = [];
      for (const itemId in data) {
        const item = data[itemId];
        if (item.email === auth.currentUser.email) {
          filteredData.push(item);
        }
      }
      let i = 0;
      let p = 0;
      filteredData.forEach((item) => {
        Object.keys(item).forEach((key) => {

          if (p <= 18 && p >= 16) { document.getElementById("container2ul-row2").innerHTML += `<td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">${item[key]} </td>` }
          if (p <= 21 && p >= 19) { document.getElementById("container3ul-row2").innerHTML += `<td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">${item[key]}</td>` }
          if (p <= 24 && p >= 22) { document.getElementById("container4ul-row2").innerHTML += `<td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">${item[key]}</td>` }
         
           
            p++;
      });
          Object.keys(item).forEach((key) => {
            if(key=="Referralcode"&&item[key]==""){document.getElementById("reff").style.display="block"}
            if (key == "alloted" && item[key] != "NO") {
              document.getElementById("progressvalue").innerHTML=`75%`
              document.getElementById("progressvalue2").style.width="75%"

            i = 1;
    
            document.getElementById("showresult").innerHTML = `Congratulations! You have been allotted as a delegate speaker of <span class="text-[#fff] block mx-auto">${item[key]}</span>`
           
            document.getElementById("paynow!").style.display = 'block'
            document.getElementById("showresult").style.color="#A3CF3A"
            Object.keys(item).forEach((key) => {
              if(key=="Delegate_type"&&item[key]=="IIT BHU"){
                if(item["Registration_type"]=="Campus Ambassador")
             { const snapshot = get(ref(database, "Referral_program/"))
             .then((snapshot) => {
               const data = snapshot.val();
         
               const filteredData1 = [];
               for (const itemId in data) {
                 const item = data[itemId];
                 if (item.email === auth.currentUser.email) {
                   filteredData1.push(item);
                 }
               }
               

               filteredData1.forEach((item) => { Object.keys(item).forEach((key) => {
                if(key=="PaymentConfirmed"&&item[key]>=10){document.getElementById("paymentqr").src="/images/QRfor10.jpg"}
                if(key=="PaymentConfirmed"&&item[key]>=15){document.getElementById("paymentqr").src="/images/QRfor15.jpg"}
                if(key=="PaymentConfirmed"&&item[key]>=25){document.getElementById("paymentqr").src="/images/QRfor25.jpg"}
                else{ document.getElementById("paymentqr").src="/images/abhishek.jpg"}  
              })})




              
              
              })
              
             
              
             
             
            
             
            
            }
                else{
                  Object.keys(item).forEach((key) => {
if(key=="p_name2"){document.getElementById("paymentqr").src="/images/paymentprice*2.jpg"}
else{ document.getElementById("paymentqr").src="/images/aastha.jpg"}
                  })
                  
                 }
              document.getElementById("paymentqr").style.display="block"
              document.getElementById("paymentqr").style.width="320px"
              document.getElementById("paymentqr").style.height="240px"
              document.getElementById("ssform").style.display="block"
            
            }
              if(key=="Delegate_type"&&item[key]=="BHU"){{
                if(item["Registration_type"]=="Campus Ambassador")
             { const snapshot = get(ref(database, "Referral_program/"))
             .then((snapshot) => {
               const data = snapshot.val();
         
               const filteredData1 = [];
               for (const itemId in data) {
                 const item = data[itemId];
                 if (item.email === auth.currentUser.email) {
                   filteredData1.push(item);
                 }
               }
               

               filteredData1.forEach((item) => { Object.keys(item).forEach((key) => {
                if(key=="PaymentConfirmed"&&item[key]>=10){document.getElementById("paymentqr").src="/images/QRfor10.jpg"}
                if(key=="PaymentConfirmed"&&item[key]>=15){document.getElementById("paymentqr").src="/images/QRfor15.jpg"}
                if(key=="PaymentConfirmed"&&item[key]>=25){document.getElementById("paymentqr").src="/images/QRfor25.jpg"}
                else{ document.getElementById("paymentqr").src="/images/abhishek.jpg"}
                              })})




              
              
              })
              
             
              
             
             
            
             
            
            }
                
                
               else{   Object.keys(item).forEach((key) => {
                if(key=="p_name2"){document.getElementById("paymentqr").src="/images/paymentprice*2.jpg"}
                else{ document.getElementById("paymentqr").src="/images/abhishek.jpg"}
                                  })}
              document.getElementById("paymentqr").style.display="block"
              document.getElementById("paymentqr").style.width="320px"
              document.getElementById("paymentqr").style.height="240px"
              document.getElementById("ssform").style.display="block"
            
            
            }}
         
             if(key=="Delegate_type"&&item[key]=="Outstation"){{
             if(item["Registration_type"]=="Campus Ambassador")
             { const snapshot = get(ref(database, "Referral_program/"))
             .then((snapshot) => {
               const data = snapshot.val();
         
               const filteredData1 = [];
               for (const itemId in data) {
                 const item = data[itemId];
                 if (item.email === auth.currentUser.email) {
                   filteredData1.push(item);
                 }
               }
               

               filteredData1.forEach((item) => { Object.keys(item).forEach((key) => {
                if(key=="PaymentConfirmed"&&item[key]>=10){document.getElementById("paymentqr").src="/images/QRfor10.jpg"}
                if(key=="PaymentConfirmed"&&item[key]>=15){document.getElementById("paymentqr").src="/images/QRfor15.jpg"}
                if(key=="PaymentConfirmed"&&item[key]>=25){document.getElementById("paymentqr").src="/images/QRfor25.jpg"}
                else{ document.getElementById("paymentqr").src="/images/abhishek.jpg"}    
              })})




              
              
              })
              
             
              
             
             
            
             
            
            }
             else{
              Object.keys(item).forEach((key) => {
                if(key=="p_name2"){document.getElementById("paymentqr").src="/images/paymentprice*2.jpg"
              
              }
                else{ document.getElementById("paymentqr").src="/images/satwik.jpg"}
                                  })}
             document.getElementById("paymentqr").style.display="block"
             document.getElementById("paymentqr").style.width="520px"
              document.getElementById("paymentqr").style.height="440px"
              document.getElementById("ssform").style.display="block"
            
            
            }}
            if(key=="PaymentSS"&&item[key]!=""){
              document.getElementById("afterpayment").innerHTML="<h1 class='text-2xl text-['#A3CF3A'] text-center font-semibold'>We have received your payment screenshot,We will verify and update the portal soon.</h1>"
            }
            if(key=="Payment_done"&&item[key]!="NO"){
              document.getElementById("progressvalue").innerHTML=`100%`
              document.getElementById("progressvalue2").style.width="100%"
              document.getElementById("ssform1").innerHTML="<h1 class='mt-4 text-2xl text-['#A3CF3A']'>Payment Completed! You are all set for IIT BHU MUN 2023.</h1>"
            
    if(item["Referralcode"]!=null){
      const snapshot = get(ref(database, "Referral_program/"))
        .then((snapshot) => {
          const data = snapshot.val();
        
          const filteredData = [];
          for (const itemId in data) {
            const item1 = data[itemId];
            if (item1.referralCode === item["Referralcode"]) {
              const entryId = itemId;
              const userRegisteredRef = ref(database,"Referral_program/"+entryId+"/"+"PaymentConfirmed");
    
              runTransaction(userRegisteredRef, (PaymentConfirmed) => {
                return (PaymentConfirmed || 0) + 1; // Increment the count by 1
              })
                .then(() => {
                  console.log('PaymentConfirmed count incremented successfully');
                })
                .catch((error) => {
                  console.error('Error incrementing PaymentConfirmed count:', error);
                });
            }
          }})

  }

            }
            
  


            })
          }
          if(key=="p_name2"){
           document.getElementById("ddheader").innerHTML=`<h1 id="ddportfolio" class="  text-4xl font-extrabold leading-none tracking-tight text-[#189BA5] mb-12 md:text-5xl lg:text-6xl dark:text-[#189BA5]">Double Delegate Profile</h1>`
          document.getElementById("content3").innerHTML = `
 
          <ul class='datacard rounded-lg sm:px-8 px-24  bg-red-500 mb-6 w-fit mx-auto block  ' >
          
          <img src="images/profileicon.png" class="inline mx-auto w-40 h-40 rounded-full"></img>
         <li class="mb-6 text-2xl mx-6 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Name:  ${item["p_name2"]} </li>
         <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Age: ${item["p_Age2"]} </li>
         <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Gender:  ${item["p_Gender2"]} </li>
         <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Institute:  ${item["p_Institute2"]} </li>
         <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"> ${item["p_MUNcount2"]} </li>
         <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Region:${item["p_Region2"]} </li>
         <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"> Email: ${item["p_email2"]} </li>
        <li class="mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">Phone Number:${item["p_Phone_number_2"]}</li>             </ul>
        
         `;
        
     
        }
        
          
        });
        if (i == 0) { document.getElementById("showresult").innerHTML = `Sit back and relax,you will be notified on email after allotment of preferences! You can also visit the site regularly to check the allotment.` }
        
        // document.getElementById("showresult").style.color="white"
        
      });
    })
    .catch((error) => {
      alert("Error fetching preferences data:", error);
    });
};

fetchData1();


function updatedata2(){
const databaseRef = ref(database, "preferences");
  const auth = getAuth();
  // Retrieve the data once
  get(databaseRef)
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {

        const data = childSnapshot.val();


        if (data.email === auth.currentUser.email) {


         
          const dataRef = ref(database, `preferences/${childSnapshot.key}`);

          // Update the value using the reference and the updated data
          update(dataRef, {

          Referralcode: document.getElementById("reffvalue").value,












          })
            .then(() => {

 const snapshot = get(ref(database, "Referral_program/"))
            .then((snapshot) => {
              const data = snapshot.val();
            
              
              for (const itemId in data) {
                const item = data[itemId];
              
                  const entryId = itemId;
                  const userRegisteredRef = ref(database,"Referral_program/"+entryId+"/"+"UserRegistered");
        
                  runTransaction(userRegisteredRef, (userRegistered) => {
                    return (userRegistered || 0) + 1; 
                  })
                    .then(() => {
                      alert("Referral code succesfully applied")
                    })
                    .catch((error) => {
                      console.error('Error incrementing UserRegistered count:', error);
                    });
                
              }})
      
      

             













































            })
            .catch((error) => {
              alert("Error Updating Data!")

            });

}})})}

function updatedata() {

  let Committee1 = document.getElementById("Committee1").value
  let Committee2 = document.getElementById("Committee2").value
  let Committee3 = document.getElementById("Committee3").value
  let pref1option1 = document.getElementById("pref1option1").value
  let pref1option2 = document.getElementById("pref1option2").value
  let pref1option3 = document.getElementById("pref1option3").value
  let pref2option1 = document.getElementById("pref2option1").value
  let pref2option2 = document.getElementById("pref2option2").value
  let pref2option3 = document.getElementById("pref2option3").value
  let pref3option1 = document.getElementById("pref3option1").value
  let pref3option2 = document.getElementById("pref3option2").value
  let pref3option3 = document.getElementById("pref3option3").value
  const databaseRef = ref(database, "preferences");
  const auth = getAuth();
  // Retrieve the data once
  get(databaseRef)
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {

        const data = childSnapshot.val();


        if (data.email === auth.currentUser.email) {


         
          const dataRef = ref(database, `preferences/${childSnapshot.key}`);

          // Update the value using the reference and the updated data
          update(dataRef, {

            option1: Committee1 + ":" + pref1option1,
            option2: Committee1 + ":" + pref1option2,
            option3: Committee1 + ":" + pref1option3,
            option4: Committee2 + ":" + pref2option1,
            option5: Committee2 + ":" + pref2option2,
            option6: Committee2 + ":" + pref2option3,
            option7: Committee3 + ":" + pref3option1,
            option8: Committee3 + ":" + pref3option2,
            option9: Committee3 + ":" + pref3option3,












          })
            .then(() => {



              document.getElementById("after").innerHTML = "Portfolio Successfully Updated!"













































            })
            .catch((error) => {
              alert("Error Updating Data!")

            });
        }
      });
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

}

document.getElementById("updatevalues").addEventListener("click", updatedata)










