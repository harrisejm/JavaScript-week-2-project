import $ from 'jquery';
import { renderBy, render } from './doctors';

//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles.css';

$(document).ready(function() {
  $('#find').click(function(event) {
    event.preventDefault();
    let firstName = $("fistName").val();
    let lastName = $("#lastName").val();

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url =`https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&location=wa-seattle&skip=0&limit=100&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      render(body.data);

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

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url =`https://api.betterdoctor.com/2016-03-01/doctors?query=${condition}&location=wa-seattle&user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      $('#showIt').text("");
      for (let i = 0; i < body.data.length; i++) {
        renderBy(body.data[i]);
      }
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
