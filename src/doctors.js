import $ from 'jquery';

export function render(data) {
  if (data.length === 0) {
     $('#showIt').append("No results found");
  } else {
    $('#showIt').append(`${data[0].profile.first_name}` + " " +  `${data[0].profile.last_name}` + " " + `${data[0].profile.title}` + "</br>" + `${data[0].practices[0].visit_address.street}` + "</br>" + `${data[0].practices[0].visit_address.city}` + ", " + `${data[0].practices[0].visit_address.state}` + " " + `${data[0].practices[0].visit_address.zip}` + "</br>" + "Phone: " + `${data[0].practices[0].phones[0].number}` + "</br>" + `${data[0].practices[0].website}`);
  }
}

export function renderBy(data) {
  $('#showIt').append(`${data.practices[0].name}`
    + "</br>" + `${data.practices[0].visit_address.street}` + "</br>" + `${data.practices[0].visit_address.city}` + ", " + `${data.practices[0].visit_address.state}` + " " + `${data.practices[0].visit_address.zip}` + "</br>" + "Phone: " + `${data.practices[0].phones[0].number}` + "</br>" + "Accepts New Patients: " +  `${data.practices[0].accepts_new_patients}` + "</br>" + "</br>");
}
