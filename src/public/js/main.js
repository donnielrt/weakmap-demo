const objectCount = 100000;

let objectHeap = {};
let mapHeap = new Map();
let weakMapHeap = new WeakMap();
let weakMapKeys = [];

function printStatus() {
  console.log(
    "Object heap",
    objectHeap,
    "Size: ",
    Object.keys(objectHeap).length
  );
  console.log("Map heap", mapHeap, "Size: ", mapHeap.size);
  console.log("Object heap", weakMapHeap, "Size: ", weakMapHeap.size);
}

// Fill the different dictionary-types with random data
function createObjects() {
  for (let ctr = 0; ctr < objectCount; ctr++) {
    objectHeap[ctr] = {
      data: Math.floor(Math.random() * 10)
    };
    mapHeap.set(ctr, {
      data: Math.floor(Math.random() * 10)
    });

    weakMapKeys[ctr] = { key: ctr };
    weakMapHeap.set(weakMapKeys[ctr], {
      data: Math.floor(Math.random() * 10)
    });
  }
  printStatus();
}

// Set odd half of all values to `undefined` to simulate objects being removed
// from the heap at runtime. This will let us see if the garbage collector culls
// these values
function thanosify() {
  for (let ctr = 0; ctr < objectCount; ctr++) {
    if (ctr % 2 === 0) {
      objectHeap[ctr] = undefined;
      mapHeap.set(ctr, undefined);
      
      // This is a gotcha! The below won't work, because { key: ctr } is a 
      // new object in memory and !== { key: ctr }
      // weakMapHeap.set({ key: ctr }, undefined);

      weakMapHeap.set(weakMapKeys[ctr], undefined);
    }
  }
  printStatus();
}

function attachListeners() {
  const fillHeapButton = document.getElementById("fill-heap");
  const thanosifyButton = document.getElementById("thanosify");

  fillHeapButton.addEventListener("click", createObjects);
  thanosifyButton.addEventListener("click", thanosify);
}

attachListeners();
