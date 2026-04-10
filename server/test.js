const argon2 = require('argon2');

(async () => {
  const hash = await argon2.hash('...');

  console.log(hash);
})();