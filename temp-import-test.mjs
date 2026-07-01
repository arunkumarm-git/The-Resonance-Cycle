import('./scenes/index.js')
  .then(m => { console.log('OK'); })
  .catch(e => { console.error(e.stack); process.exit(1); });
