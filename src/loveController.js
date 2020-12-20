import { LoveModel } from './loveModel.js';
import { LoveView } from './loveView.js';
import { ApiLoader } from './apiLoader.js';


export class LoveController {
  constructor() {
    this.api = new ApiLoader()
    this.model = new LoveModel(this.api);
    this.view = new LoveView(this.loadPersons.bind(this));
  }

  loadPersons(){
    return this.model.setLovers();
  }
}

