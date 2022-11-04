class Storage{
  constructor(store = localStorage, scope = "lol_tft"){
    this.store = store;
    this.scope = scope;
  }

  _key(key){
    return this.scope + "-" + key
  }

  set(key,value){
    this.store[this._key(key)] = JSON.stringify(value)
  }
  get(key){
    let raw = this.store[this._key(key)];
    if(raw){
      return JSON.parse(raw)
    }else{
      return undefined
    }
  }
}


export default new Storage();