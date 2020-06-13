const NodeCache = require('node-cache');

const nodeCache = new NodeCache({ stdTTL: 3, checkperiod: 120 });

console.log(nodeCache.set('myKey', 'myValue'));
// console.log(nodeCache.has('myKey'));
// console.log(nodeCache.take('myKey'));
// console.log(nodeCache.has('myKey'));

setInterval(() => {
  console.log(nodeCache.has('myKey'));
}, 1000);

// setTimeout(() => {
//   console.log(nodeCache.take('myKey'));
// }, 3000);

// setTimeout(() => {
//   console.log(nodeCache.take('myKey'));
// }, 5000);
