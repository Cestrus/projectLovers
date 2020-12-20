export class LoveView {
  constructor(loadPersons) {
    this.DOM = {
      btnStart: document.querySelector('.btn-start'),
      gameBox: document.querySelector('.gameBox'),
      person1_Box: document.querySelector('.first-person'),
      person2_Box: document.querySelector('.second-person'),
      person1_Img: document.querySelector('.person1-img'),
      person2_Img: document.querySelector('.person2-img'),
      person1_zSign: document.querySelector('.zodiac__sign1'),
      person2_zSign:document.querySelector('.zodiac__sign2'),
      btnListHeart: document.querySelector('.btn-list-heart'),
      result: document.querySelector('.result'),
    }
    this.loadPersons = loadPersons;
    this.DOM.btnStart.addEventListener('click', this.startNewGame.bind(this));
    this.DOM.gameBox.addEventListener('click', this.chooseHeart.bind(this));
    this.loversComp = null;
    
  }

  startNewGame(){
    this.loadPersons()
    .then(res => {
      this.renderPersoneImg(res);
      this.renderZodiac(res);
      this.renderMenu();
      this.loversComp = res[2];
    });
  }
  
  renderMenu() {
    this.DOM.result.classList.add('hide');
    this.DOM.person1_Box.classList.remove('animation-back');
    this.DOM.person2_Box.classList.remove('animation-back');
    this.DOM.person1_Box.classList.add('animation-left');
    this.DOM.person2_Box.classList.add('animation-right');
    this.DOM.btnStart.classList.add('hide');
    setTimeout(() => {
      this.DOM.btnListHeart.classList.remove('hide');
    }, 600);
  }
  
  renderPersoneImg(lovers){
    this.DOM.person1_Img.src = lovers[0].img;
    this.DOM.person2_Img.src = lovers[1].img;
  }

  renderZodiac = (lovers) => {
    this.DOM.person1_zSign.style.backgroundImage = `url(${lovers[0].zSign})`;
    this.DOM.person2_zSign.style.backgroundImage = `url(${lovers[1].zSign})`;
  }

  chooseHeart = (ev) => {
    let btn = ev.target;
    switch (true){
      case (btn.classList.contains('btn-heart-1')): {
        this.renderResult(this.checkAnswer(1));
        break;
      };
      case (btn.classList.contains('btn-heart-2')): {
        this.renderResult(this.checkAnswer(2));
        break;
      };
      case (btn.classList.contains('btn-heart-3')): {
        this.renderResult(this.checkAnswer(3));
        break;
      };
      case (btn.classList.contains('btn-heart-4')): {
        this.renderResult(this.checkAnswer(4));
        break;
      };
      case (btn.classList.contains('btn-heart-5')): {
        this.renderResult(this.checkAnswer(5));
        break;
      };
      default: return;
    }
  }
  
  checkAnswer = (num) => { 
    return num === this.loversComp;
  };
  
 
  renderResult = (isWin) => {
    let str = (isWin)? 'YOU WIN!' : 'YOU LOSE!';
    this.DOM.result.firstChild.innerText = str;
    this.DOM.result.classList.remove('hide');
    this.resetDOM();
  }
  
  resetDOM = () => {
    this.DOM.btnListHeart.classList.add('hide');
    this.DOM.person1_Box.classList.remove('animation-left');
    this.DOM.person2_Box.classList.remove('animation-right');
    this.DOM.person1_Box.classList.add('animation-back');
    this.DOM.person2_Box.classList.add('animation-back');
    setTimeout(() => {
      this.DOM.btnStart.classList.remove('hide');
    }, 600);
  }  
}