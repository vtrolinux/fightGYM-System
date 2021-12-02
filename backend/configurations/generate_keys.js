// usado para gerar a SECRET(env) do JWT se preferir
const crypto = require('crypto')
const base64url = require('base64url')
console.log('escolha 1: '+crypto.randomBytes(32).toString('hex'))
console.log('escolha 2: '+base64url(crypto.randomBytes(32).toString('hex')))