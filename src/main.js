import $ from 'jquery';
import { callByCondition, callByName } from './doctors';

//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles.css';

$(document).ready(function() {
  $('#find').click(function(event) {
    event.preventDefault();
    let firstName = $("fistName").val();
    let lastName = $("#lastName").val();

    callByName(firstName, lastName).then(function(response) {
      let body = JSON.parse(response);
      renderByName(body.data);

    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });


  $('#findCondition').click(function(event) {
    event.preventDefault();
    let condition = $("#condition").val();
    let conditionTest = condition.split(" ");
    if (conditionTest.length > 1) {
      let condition1 = [];
      for (let i = 0; i < conditionTest.length; i++) {
        condition1.push(conditionTest[i]);
        condition1.push("%20");
      }
      condition1.pop();
      condition = condition1.join("");
    }

    callByCondition(condition).then(function(response) {
      let body = JSON.parse(response);
      $('#showIt').text("");
      if (body.data.length === 0) {
         $('#showIt').append("No results found");
      } else {
        for (let i = 0; i < body.data.length; i++) {
          renderByCondition(body.data[i]);
        }
      }
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

  function renderByName(data) {
    if (data.length === 0) {
       $('#showIt').append("No results found");
    } else {
      $('#showIt').append(`${data[0].profile.first_name}` + " " +  `${data[0].profile.last_name}` + " " + `${data[0].profile.title}` + "</br>" + `${data[0].practices[0].visit_address.street}` + "</br>" + `${data[0].practices[0].visit_address.city}` + ", " + `${data[0].practices[0].visit_address.state}` + " " + `${data[0].practices[0].visit_address.zip}` + "</br>" + "Phone: " + `${data[0].practices[0].phones[0].number}` + "</br>" + `${data[0].practices[0].website}`);
    }
  }

  function renderByCondition(data) {
    $('#showIt').append(`${data.practices[0].name}`
      + "</br>" + `${data.practices[0].visit_address.street}` + "</br>" + `${data.practices[0].visit_address.city}` + ", " + `${data.practices[0].visit_address.state}` + " " + `${data.practices[0].visit_address.zip}` + "</br>" + "Phone: " + `${data.practices[0].phones[0].number}` + "</br>" + "Accepts New Patients: " +  `${data.practices[0].accepts_new_patients}` + "</br>" + "</br>");
  }


});
