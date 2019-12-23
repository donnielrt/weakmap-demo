const objectCount = 1000000;

let objectHeap = {
  data: [],
};
let mapHeap = new Map();
let weakMapHeap = new WeakMap();

function createObjects() {
  let refs = [];
  for (let ctr = 0; ctr < objectCount; ctr++) {
    refs.push(Math.floor(Math.random() * 10));
  }

  return refs;
}

function populate(target) {
  return () => {
    switch(target) {
      case 'object':
        objectHeap['data'] = createObjects();
        console.log('Object heap created', objectHeap);
        break;

      case 'map':
        mapHeap.set('data', createObjects());
        console.log('Map heap created', mapHeap);
        break;

      case 'weakmap':
        weakMapHeap.set({key: 'data'}, createObjects());
        console.log('WeakMap heap created', weakMapHeap)
        break;
    }
  };
}

// function queryValue(target) {
//   const key = Math.floor(Math.random() * objectCount);
  
//   switch(target) {

//   }
//   console.log(`Value at ${key} is value`);
// }

function clearHeap() {
  objectHeap['data'] = [];
  mapHeap['data'] = [];
  weakMapHeap['data'] = [];
  console.log('Heap cleared');
}

function attachListeners() {
  const fillObjectButton = document.getElementById('fill-object');
  const fillMapButton = document.getElementById('fill-map');
  const fillWeakMapButton = document.getElementById('fill-weakmap');
  const clearHeapButton = document.getElementById('clear-heap');

  fillObjectButton.addEventListener('click', populate('object'))
  fillMapButton.addEventListener('click', populate('map'))
  fillWeakMapButton.addEventListener('click', populate('weakmap'))
  clearHeapButton.addEventListener('click', clearHeap);
}

attachListeners();