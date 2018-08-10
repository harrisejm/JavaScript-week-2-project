import $ from 'jquery';
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles.css';
// $(document).ready(function()
// {
  // $("#dino").click(function(event)
  //   {
  //     event.preventDefault();
  //    let firstName = $('#last').val();
  //     // $('#words').val();
  //     // let lastName = $('#lastName').val();
  //     // $('#paragraphs').val();
  //
  //     let request = new XMLHttpRequest();
  //     let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&limit=100000&user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
  //   //  let url = `https://api.betterdoctor.com/2016-03-01/doctors/004b64c28d73d5bb85432a500d3facd3?user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
  //     request.onreadystatechange = function()
  //     {
  //       if(this.readyState === 4 && this.status === 200)
  //       {
  //         let response = JSON.parse(this.responseText);
  //         getElements(response);
  //       }
  //     }
  //     request.open("GET", url, true);
  //     request.send();
  //     let arr = [];
  //     let docDictionary = {};
  //     let getElements = function(response)
  //     {
  //     for (let i = 0; i < response.data.length; i++) {
  //     arr.push(response.data[i].profile.first_name + " " + response.data[i].profile.last_name + " " + response.data[i].profile.title);
  //     let newDoctor = response.data[i].profile.first_name + " " + response.data[i].profile.last_name + " " + response.data[i].profile.title;
  //     docDictionary[response.data[i].uid] = newDoctor;
  //     }
  //       // let list = response.join().split(",").join(", ");
  //       //let list = response.data.practices[0].name;
  //       //let list = arr;
  //       let list = docDictionary["0b10e40e7e5bb627994059bad16fed4c"];
  //       $('#showIt').text(`${list}`);
  //     }
  //
  //     // let request2 = new XMLHttpRequest();
  //     // let url2 = `https://api.betterdoctor.com/2016-03-01/doctors/004b64c28d73d5bb85432a500d3facd3?user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
  //     // request2.onreadystatechange = function()
  //     // {
  //     //   if(this.readyState === 4 && this.status === 200)
  //     //   {
  //     //     let response = JSON.parse(this.responseText);
  //     //     getElements2(response);
  //     //   }
  //     // }
  //     // request2.open("GET", url2, true);
  //     // request2.send();
  //     // let getElements2 = function(response)
  //     // {
  //     //
  //     // //  let list = docDictionary["0b10e40e7e5bb627994059bad16fed4c"];
  //     //   $('#showIt').text(`${response.data.practices[0].name}`);
  //     // }
  //
  //
  //
  //   });
  //   });



    $(document).ready(function() {
      $('#find').click(function(event) {
         event.preventDefault();
         let firstName = $("fistName").val();
         let lastName = $("#lastName").val();

        let promise = new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();
          // let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&limit=100000&user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
          let url =`https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&location=wa-seattle&skip=0&limit=10&user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
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
          // let arr = [];
          // let docDictionary = {};
          // for (let i = 0; i < body.data.length; i++) {
          // arr.push(body.data[i].profile.first_name + " " + body.data[i].profile.last_name + " " + body.data[i].profile.title);
          // let newDoctor = body.data[i].profile.first_name + " " + body.data[i].profile.last_name + " " + body.data[i].profile.title;
          // docDictionary[body.data[i].uid] = newDoctor;
          // }
            // let list = response.join().split(",").join(", ");
            //let list = response.data.practices[0].name;
            //let list = arr;
        //    let list = docDictionary["0b10e40e7e5bb627994059bad16fed4c"];
          //  $('#showIt').text(`${list}`);
            $('#showIt').append(`${body.data[0].profile.first_name}` + " " +  `${body.data[0].profile.last_name}` + " " + `${body.data[0].profile.title}` + "</br>" + `${body.data[0].practices[0].visit_address.street}` + "</br>" + `${body.data[0].practices[0].visit_address.city}` + ", " + `${body.data[0].practices[0].visit_address.state}` + " " + `${body.data[0].practices[0].visit_address.zip}` + "</br>" + "Phone: " + `${body.data[0].practices[0].phones[0].number}` + "</br>" + `${body.data[0].practices[0].website}`);

        }, function(error) {
          $('#showErrors').text(`There was an error processing your request: ${error.message}`);
        });


        // let promise1 = new Promise(function(resolve, reject) {
        //   let request = new XMLHttpRequest();
        //   let url = `https://api.betterdoctor.com/2016-03-01/doctors/004b64c28d73d5bb85432a500d3facd3?user_key=0d9b3d2e941d5fb5fc6b1ecdc6baf06d`;
        //   request.onload = function() {
        //     if (this.status === 200) {
        //       resolve(request.response);
        //     } else {
        //       reject(Error(request.statusText));
        //     }
        //   }
        //   request.open("GET", url, true);
        //   request.send();
        // });



      });
    });
