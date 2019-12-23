const objectCount = 100000;

let data;
let objectType = 'object';

class ObjectData {
  constructor() {
    this.data = new Object();
  }
  
  set(key, value) {
    this.data[key] = value;
  }

  get(key) {
    return this.data[key];
  }
}

class MapData {
  keys = new Map();

  constructor() {
    this.data = new Map();
  }
  
  set(key, value) {
    let weakmapKey = this.keys.get(key);
    if (weakmapKey == null) {
      this.keys.set(key, {key});
      weakmapKey = this.keys.get(key);
    }
    
    this.data.set(weakmapKey, value);
  }

  get(key) {
    const weakmapKey = this.keys.get(key);
    return this.data.get(weakmapKey);
  }

  deleteKey(key) {
    this.keys.set(key, undefined);
  }
}

class WeakMapData {
  keys = new Map();

  constructor() {
    this.data = new WeakMap();
  }
  
  set(key, value) {
    // Gotcha alert! We can't just set a new key every time, because
    // the old key wont be !== the new key in memory.
    let weakmapKey = this.keys.get(key);
    if (weakmapKey == null) {
      this.keys.set(key, {key});
      weakmapKey = this.keys.get(key);
    }

    this.data.set(weakmapKey, value);
  }

  get(key) {
    const weakmapKey = this.keys.get(key);
    return this.data.get(weakmapKey);
  }

  deleteKey(key) {
    this.keys.set(key, undefined);
  }
}

const constructors = {
  'object': ObjectData,
  'map': MapData,
  'weakmap': WeakMapData,
};

function printData() {
  console.log(`${objectType} data:`, data);
}

function fillData() {
  data = new constructors[objectType];
  for (let ctr = 0; ctr < objectCount; ctr++) {
    data.set(ctr, Math.floor(Math.random() * 10));
  }
  printData();
}

// Set odd half of all values to `undefined` to simulate objects being removed
// from the heap at runtime. This will let us see if the garbage collector culls
// these values.
function thanosify() {
  for (let ctr = 0; ctr < objectCount; ctr++) {
    if (ctr % 2 === 0) {
      data.set(ctr, undefined);
    }
  }
  printData();
}

function expireKeys() {
  if (objectType === 'object') {
    console.log(`Cannot delete keys on Objects`);
    return;
  }

  for (let ctr = 0; ctr < objectCount; ctr++) {
    if (ctr % 2 === 0) {
      data.deleteKey(ctr);
    }
  }

  console.log('Keys deleted');
}

function queryObject() {
  const objectIndexInput = document.getElementById('object-index');
  const index = parseInt(objectIndexInput.value, 10);

  console.log(`Looking up ${index}`, data.get(index));
}

function setObjectType(event) {
  objectType = event.target.value;
}

function attachListeners() {
  const fillHeapButton = document.getElementById("fill-heap");
  const thanosifyButton = document.getElementById("thanosify");
  const expireKeysButton = document.getElementById("expire-keys");
  const queryObjectButton = document.getElementById("query-object");
  const objectTypeRadios = document.querySelectorAll('input[name="object-type"]');

  fillHeapButton.addEventListener("click", fillData);
  thanosifyButton.addEventListener("click", thanosify);
  expireKeysButton.addEventListener("click", expireKeys);
  queryObjectButton.addEventListener("click", queryObject);
  objectTypeRadios.forEach((el) => {
    el.addEventListener("change", setObjectType);
  });
}

attachListeners();
