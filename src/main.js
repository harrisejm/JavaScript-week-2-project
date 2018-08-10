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
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&limit=100000&user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
    //  let url = `https://api.betterdoctor.com/2016-03-01/doctors/004b64c28d73d5bb85432a500d3facd3?user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
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
      let arr = [];
      let docDictionary = {};
      for (let i = 0; i < response.data.length; i++) {
      arr.push(response.data[i].profile.first_name + " " + response.data[i].profile.last_name + " " + response.data[i].profile.title);
      let newDoctor = response.data[i].profile.first_name + " " + response.data[i].profile.last_name + " " + response.data[i].profile.title;

      docDictionary[response.data[i].uid] = newDoctor;

      }


        // let list = response.join().split(",").join(", ");
        //let list = response.data.practices[0].name;
        //let list = arr;
        let list = docDictionary["0b10e40e7e5bb627994059bad16fed4c"];
        $('#showIt').text(`${list}`);
      }
    });
    });
