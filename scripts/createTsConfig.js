const fs = require('fs');

console.log(process.env.REACT_APP_IS_WEB);

if (process.env.REACT_APP_IS_WEB) {
  fs.copyFileSync('tsconfig.web.json', 'tsconfig.json');
} else {
  fs.copyFileSync('tsconfig.mobile.json', 'tsconfig.json');
}
