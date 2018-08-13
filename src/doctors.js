import $ from 'jquery';

export function callByCondition(condition) {
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
  return promise;
}

export function callByName(firstName, lastName){
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
    return promise;
  }
