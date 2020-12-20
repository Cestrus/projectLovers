export class ApiLoader {
  constructor() {
    this.url = 'https://randomuser.me/api/';
  }

  getPerson (resolve, rejected, gender){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://randomuser.me/api/${ (gender === 'man')? '?gender=male' : '?gender=female' }`, true);
    xhr.send();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState == 4 && this.status == 200) {
          const user = JSON.parse(this.responseText);
          return resolve(user.results[0]);
      } 
      // else {
      //   return rejected(new Error('Error load!'));
      // }
    }); 
  }
}