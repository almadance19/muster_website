
const url = 'https://script.google.com/macros/s/AKfycby0bgJuGUwB4ltdEHfAyJed14jHiL4_o1mRU6lvl9UfY2iIKN-Q7az_avwKPFYkyTs/exec';

//get buttons 
const btn_ticket = document.getElementById('get_ticket_btn');
const email_input = document.getElementById('User_id');
const output = document.querySelector('.output');

//event listener buttons 
btn_ticket.addEventListener('click', unSubscribe);


// USUBSCRIBE
function unSubscribe() {
    const param_value = User_id.value;
    console.log(param_value);
    //var email_value = document.querySelector('input[name=email]').value;
    //var param_value = 'cs_test_b1xpdTLVaCKt08hp62mdGKfbCsVarlBfNacqwabzJFFreUYbnfWmU6QUzk';
      if (param_value != '') {
  
        urlapi = url+"?mail="+param_value
        console.log(urlapi);
        document.getElementById("success_message").innerHTML = "Loading..";
        document.getElementById("success_message").style = "color: #800000";
        console.log("fetching user data");
        fetch(urlapi).then(function (rep) {
          return rep.json()
        }).then(function (data) {
          console.log(data);
  
          if (data=="NOTHING FOUND") {
            output.innerHTML = "";
            document.getElementById("user_message").innerHTML = "You received a confirmation Email from info@alma-dance.com";
            document.getElementById("success_message").innerHTML = "Unsubscribed";
            document.getElementById("success_message").style = "color: #800000";
            document.getElementById("name_display").innerHTML = "You can still get infos from our Website" ;
            idinput.value = "";
  
          } else {
          output.innerHTML = "";
          console.log("creating ticket payment");
          document.getElementById("user_message").innerHTML = "You received a confirmation Email from info@alma-dance.com";
            document.getElementById("success_message").innerHTML = "Unsubscribed";
            document.getElementById("success_message").style = "color: #800000";
            document.getElementById("name_display").innerHTML = "You can still get infos from our Website" ;
  
            }
  
        });
        } else {
            document.getElementById("success_message").innerHTML = "Enter Valid Email";
            document.getElementById("success_message").style = "color: #800000";
        }
  }