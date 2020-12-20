
export class LoveModel {
  constructor(api) {
    this.table = [91,81,72,81,97,84,83,76,92,82,82,87,72,87,73,83,88,92,92,98,81,89,83,91,83,73,84,67,81,93,89,93,98,82,93,82,91,93,77,83,82,84,94,91,82,96,84,90,99,91,68,71,87,86,79,98,90,76,97,83,71,69,75,81,73,75,74,98,72,61,72,67,82,93,93,78,89,85,91,64,88,92,96,81,72,60,58,89,92,76,77,94,92,100,88,97,84,72,100,71,100,82,92,100,100,79,100,71,82,86,71,82,83,85,81,100,93,84,82,67,100,82,93,66,92,67,100,89,100,92,77,100,85,82,81,83,95,100,100,100,74,93,93,100];

    this.zodiacs = ['Овен','Телец','Близнецы','Рак','Лев','Дева','Весы','Скорпион','Стрелец','Козерог','Водолей','Рыбы'];
    this.zodiacsUTF = [
    'http://pngimg.com/uploads/aries/aries_PNG1.png',
    'http://pngimg.com/uploads/taurus/taurus_PNG51.png',
    'http://pngimg.com/uploads/gemini/gemini_PNG16.png',
    'http://pngimg.com/uploads/cancer_zodiac/cancer_zodiac_PNG38.png',
    'http://pngimg.com/uploads/leo/leo_PNG43.png',
    'http://pngimg.com/uploads/virgo/virgo_PNG1.png',
    'http://pngimg.com/uploads/libra/libra_PNG49.png',
    'http://pngimg.com/uploads/scorpio/scorpio_PNG3.png',
    'http://pngimg.com/uploads/sagittarius/sagittarius_PNG75.png',
    'http://pngimg.com/uploads/capricorn/capricorn_PNG88.png',
    'http://pngimg.com/uploads/aquarius/aquarius_PNG24.png',
    'http://pngimg.com/uploads/pisces/pisces_PNG25.png'];
    this.api = api;
    this.lovers = [];
  }

  async setLovers(){
    const persons = await this.loadPersons(); 
    this.getCompatibility(persons);
    return this.lovers;
  }

  async loadPersons(){
    const persons = [];
    const man = await new Promise ((res, rej) => this.api.getPerson(res, rej, 'man'));
    const woman = await new Promise ((res, rej) => this.api.getPerson(res, rej, 'woman'));
    if(!(man instanceof URIError) && !(woman instanceof URIError)){
      persons.push(man);
      persons.push(woman); 
      return persons;
    }
  }

  convertComp(num){
    switch (true) {
      case num < 70: return 1;
      case num < 80: return 2
      case num < 90: return 3;
      case num < 100: return 4;
      case num === 100: return 5;
    }
  }

  getZodiac(person){
    const dob = new Date(person.dob.date);
    const month = dob.getMonth();

    return {
      zSign : this.zodiacsUTF[month],
      id : month,
      gender : person.gender,
      img : person.picture.large,
    };
  }

  getCompatibility(persons){
    const xy = {
        male : 'x',
        female : 'y'
    };
    this.lovers = persons.map(this.getZodiac.bind(this));
    const zodiacs = this.lovers.reduce((acc, el) => {
        acc[xy[el.gender]] = el.id;
        return acc;
    },{});
    const tableId = zodiacs.y * 12 + zodiacs.x;
    this.lovers.push(this.convertComp(this.table[tableId]));
  }

}