
// after loading 
window.addEventListener('DOMContentLoaded', getInit);


///get data
function getInit() {
  //initPayPalButton();
  //getData();
  getUser();
};

// call API COURSES
const url = 'https://script.google.com/macros/s/AKfycbzwBuxPXbT_mU0Dy3kKX6RTNdQd8MBIvysLZa54bVnd_bpuS_4tooLeYbqtnUykyvgz/exec';

const url_ticket = 'https://script.google.com/macros/s/AKfycbzKF4ruqlsWoyhz9epStqEmwYJroN9I1Hw8mx0Mccfr46BmUv3Xb8BW1Xh475jYK7_K/exec';

//get buttons 
const output = document.querySelector('.output');
const btn_ticket = document.getElementById('get_ticket_btn');

//event listener buttons 
btn_ticket.addEventListener('click', showPayment);

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
    nextpaymentinput.value = param_value ;
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

          if (data=="NOTHING FOUND") {
            output.innerHTML = "";
            document.getElementById("success_message").innerHTML = "Ticket already Processed";
            document.getElementById("success_message").style = "color: #800000";
            document.getElementById("name_display").innerHTML = "You can still send you the ticket to another Email." ;
            
            idinput.value = "";

          } else {
          output.innerHTML = "";
          console.log("creating ticket payment");
  
            document.getElementById("name_display").innerHTML = data["user"][5];
            document.getElementById("user_message").innerHTML = "Eine Email von info@alma-dance.com mit dem Ticket wurde geschickt. Bitte prüft auch deinen Spamordner.";
            document.getElementById("success_message").innerHTML = "Your Booking is completed";
            document.getElementById("success_message").style = "color: #800000";
            activeinput.innerHTML = "You can send you the ticket to another Email.";
            
            emailinput.innerHTML = data["user"][3];
            nameinput.innerHTML = data["user"][5];
            coursesinput.innerHTML = data["user"][9];
            idinput.value = data["user"][3];
            
            lastpaymentinput.innerHTML = data["user"][13];
            saldoinput.innerHTML = data["user"][7]+' '+data["user"][15];
            anmerkungeninput.innerHTML = "You received just now an Email with the Ticket & Invoice. Please check also in your spam folder.";

            }

        });
        } else {
          output.innerHTML = "Valides Email eingeben";
        }
  }


// get users data 
function showPayment() {
    const email = idinput.value;
    const param_value = nextpaymentinput.value;
    console.log(param_value+email);
    btn_ticket.disabled = true;
    btn_ticket.innerText = "Sending";
    document.getElementById("name_display").innerHTML = "Sending.." ;
    //var email_value = document.querySelector('input[name=email]').value;
    //var param_value = 'cs_test_b1xpdTLVaCKt08hp62mdGKfbCsVarlBfNacqwabzJFFreUYbnfWmU6QUzk';
      if (param_value != '') {

        urlapi = url_ticket+"?code="+param_value+"&mail="+email
        console.log(urlapi);
        output.innerHTML = "Data loading...";
        console.log("fetching user data");
        fetch(urlapi).then(function (rep) {
          return rep.json()
        }).then(function (data) {
          console.log(data);

          if (data=="NOTHING FOUND") {
            output.innerHTML = "";
            document.getElementById("success_message").innerHTML = "Ticket already Processed";
            document.getElementById("success_message").style = "color: #800000";
            document.getElementById("name_display").innerHTML = "You can still send you the ticket to another Email." ;

          } else {
          output.innerHTML = "";
          console.log("fetching payment");
  
            document.getElementById("name_display").innerHTML = data["user"][5];
            document.getElementById("user_message").innerHTML = "Eine Email von info@alma-dance.com mit dem Ticket wurde geschickt. Bitte prüft auch deinen Spamordner.";
            document.getElementById("success_message").innerHTML = "Your Ticket was sent";
            document.getElementById("success_message").style = "color: #800000";
            
            emailinput.innerHTML = data["user"][3];
            nameinput.innerHTML = data["user"][5];
            coursesinput.innerHTML = data["user"][9];
            idinput.innerHTML = "";
            activeinput.innerHTML = "";
            lastpaymentinput.innerHTML = data["user"][13];
            saldoinput.innerHTML = data["user"][7]+' '+data["user"][15];
            anmerkungeninput.innerHTML = "You received just now an Email with the Ticket & Invoice. Please check also in your spam folder.";
            nextpaymentinput.innerHTML = "";
            btn_ticket.disabled = false;

            }

        });
        } else {
          output.innerHTML = "Valides Email eingeben";
        }
  }

//// MESSAGES -----------------------------------------------
