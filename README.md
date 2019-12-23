# WeakMap demo
This is a demonstration of how WeakMaps enable more efficient reclamation of heap memory during garbage collection. 

## Usage
- `yarn dev` to run the server
- In the browser, open http://localhost:8080
- Open Chrome's devtools (or Firefox, I'm not the boss of you), open the memory profiler and take a heap snapshot as a baseline
- Click the "Fill heap" button and notice the three objects printed out in the console:
  - `NUM` randomly created objects assigned to an object
  - `NUM` random created objects assigned to a Map
  - `NUM` random created objects assigned to a WeakMap
- Note that the WeakMap's size cannot be known. This is by design.
- Run another memory heap snapshot, and note the creation of `4*NUM` `Object`s
- Click "Thanosify", which simulates a later point in time when half of all assigned objects have been unassigned (for instance, user sessions expiring in memory). Running another memory heap will show a big decrease in allocated memory (about 5MB for `NUM`=10000). If this doesn't happen, you might want to click "Collect garbage" in the snapshot tool.
- Select the "Comparison" mode in the heap snapshot to compare this snapshot with the previous one. Look for the `Objects` entry, and you should see a decrease of 

Note: `NUM` is defined in `main.js` and is the number of objects that will be assigned.