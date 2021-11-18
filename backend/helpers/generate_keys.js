// usado para gerar a SECRET(env) do JWT
const crypto = require('crypto')
const base64url = require('base64url')
const output = base64url(crypto.randomBytes(256).toString('hex'))
console.log(output)