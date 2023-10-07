


// after loading 
window.addEventListener('DOMContentLoaded', getInit);

function getInit() {
  //initPayPalButton();
  //getData();
  getUser();
};

// call API COURSES
const url = 'https://script.google.com/macros/s/AKfycbwpjfRpst_y1R_jakMQm4oiPEgTh8RbiiKWin7ksOPYfyivsmKi4KQmQLGt2LS0GJtu/exec';




//get buttons 
const output = document.querySelector('.output');

//get user fields

const emailinput = document.getElementById("User_email");
const nameinput = document.getElementById("User_name");  
const coursesinput = document.getElementById("User_courses");  
const idinput = document.getElementById("User_id");  
const activeinput = document.getElementById("User_active"); 
const lastpaymentinput = document.getElementById("User_lastpayment");  
const saldoinput = document.getElementById("User_saldo");  
const anmerkungeninput = document.getElementById("User_anmerkungen");  
const nextpaymentinput = document.getElementById("User_nextpayment");

// get users data 
function getUser() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const param_value = urlParams.get('code')
    console.log(param_value);
    //var email_value = document.querySelector('input[name=email]').value;
    //var param_value = 'cs_test_b1xpdTLVaCKt08hp62mdGKfbCsVarlBfNacqwabzJFFreUYbnfWmU6QUzk';
      if (param_value != '') {

        urlapi = url+"?code="+param_value
        console.log(urlapi);
        output.innerHTML = "Data loading...";
        console.log("fetching user data");
        fetch(urlapi).then(function (rep) {
          return rep.json()
        }).then(function (data) {
          console.log(data);

          if (data="NOTHING FOUND") {
            output.innerHTML = "ERROR 404";
            document.getElementById("success_message").innerHTML = "Unvalid URL  or  Ticket already Process";
            document.getElementById("name_display").innerHTML = "Get in contact if you have questions regarding your booking." ;

          } else {
          output.innerHTML = "";
          console.log(data["user"][2]);
          console.log(data["user"][2]);
  
            document.getElementById("name_display").innerHTML = data["user"][5];
            document.getElementById("user_message").innerHTML = "Eine Email von info@alma-dance.com mit dem Ticket wurde geschickt. Bitte prüft auch deinen Spamordner.";
            document.getElementById("success_message").innerHTML = "Your Booking is completed";
            
            emailinput.innerHTML = data["user"][3];
            nameinput.innerHTML = data["user"][5];
            coursesinput.innerHTML = data["user"][9];
            idinput.innerHTML = data[0];
            activeinput.innerHTML = data[2];
            lastpaymentinput.innerHTML = data["user"][13];
            saldoinput.innerHTML = data["user"][2]+' '+data["user"][15];
            anmerkungeninput.innerHTML = "You received just now an Email with the Ticket & Invoice. Please check also in your spam folder.";
            nextpaymentinput.innerHTML = data[4];

            }

        });
        } else {
          output.innerHTML = "Valides Email eingeben";
        }
  }