import $ from 'jquery';
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles.css';


$(document).ready(function()
{
  $("#dino").click(function(event)
    {
      event.preventDefault();
      let firstName = $('#firstName').val();
      $('#words').val();
      let lastName = $('#lastName').val();
      $('#paragraphs').val();

      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors/004b64c28d73d5bb85432a500d3facd3?user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
      request.onreadystatechange = function()
      {
        if(this.readyState === 4 && this.status === 200)
        {
          let response = JSON.parse(this.responseText);
          getElements(response);
        }
      }
      request.open("GET", url, true);
      request.send();

      let getElements = function(response)
      {
         //let list = response.join().split(",").join(", ");
        //let list = response;
        $('#showIt').text(`${response.data.practices[0].name}`);
      }
    });
    });
