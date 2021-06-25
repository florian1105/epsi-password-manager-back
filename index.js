const PORT = process.env.PORT || 5000 // this is very important
const express = require('express')
const cors = require('cors');
const NodeRSA = require('node-rsa')
require('dotenv').config()
const app = express()
app.use(
  express.urlencoded({
    extended: true
  })
)
const PRIVATE_KEY=`-----BEGIN PRIVATE KEY-----MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALdP0ljDHsKsWiulx2JDVoyW8ykgBKSdVfdeL6QMshYiIlndWPTq/rHrmceGZ6KoBe3C7HHSYUrpgMNIVtg/hot3RFpSH8SoNCUIcUr7t21G+IWxFFwiN9zbF75I02HJgmUqei1+5j+K3Cl735ewGr26WLZ7le935T9zN2PsVN9rAgMBAAECgYAS8z6EjI9GgrjDoFyvTNTKreQvUS8JsXYsn2D/bYyPezHf5mEG2LBBxmBcXwmhqAsM3ETDM4N5UhBMn9LSgiavYXfU0kpMyouq2Xe2wJGpCWtY2Yv972ag8IBaanbdwP7Z1p7HpYsUbIk0NXhcuVKo6HFeUb0OgGOaS/EvUTycaQJBANmLbu9QPnPYiAqbilboJCai0KaTeM6+WEcCJUYSpb5T6cY2hg8hLgZeXm5Fa6LBL4wneNRvlrgOKCjLtYgIHZUCQQDXtz72xqQ2YYfdNFKQAweQi22+Loi8/Vcd9E+2fXeeVckjLGfUoYNX6wEZcgk5sjFMcs75SET4cI086bAJ18j/AkAYiKgPJy6T5ASbpaT5Xh7NmKkNUC5cqozMHUrU1z+H8nC34OhHhodpQnVF3GBiL4VMOhtfYeJOiZIv36FuYPPtAkBNx0aul+TxrqzcN1dlkZISrhM9tW2cJwRYSpTLSeXtcyT4x7QQWMQQ2S0mTZXB9dwMooC6JTKpGXvzcJcGlYVlAkAcYjD4ZmKcSeaIqAbrzGCHXEAhvhze7Xeuk1kguBmDAr28+Crce342wzzgecAI0m05WGEc1zqth4ymHTIMnQlE-----END PRIVATE KEY-----`
const key = new NodeRSA()
key.importKey(PRIVATE_KEY, 'pkcs8')
const { default: axios } = require('axios')

app.use(express.json())

app.use(cors())
const mysql = require('mysql');

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "troisilets",
  
  database: "mpp"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});



app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  console.log(req.body)
  if (!email || !password) {
    res.status(401).json({ error: 'Email ou mot de passe vide.' })
    return
  }

  db.query("SELECT * FROM users where email = ?", [email], function (err, result) {
    if (err) throw err;
    if(compare(result.passord,passord)) {
      console.log("connexion accpeted")
    }

  });
});
  


  //if (bcrypt.compare(password, user.password, function(err, result) {
  //  return result
  //})){
  //  res.status(401).json({ error: 'Email / password do not match.' })
  //  return
  //}
//
  //const userJwt = jwt.sign({ user: user.email }, secret)
//
  //res.json({ jwt: userJwt })

//});

app.get('/mdps', function (req, res) {
  res.send('Hello World!')
});

function compare(bddMdpEncr, mdpEncr) {
  let decryptedbdd = key.decrypt(bddMdpEncr, 'utf8')
  let decrypted = key.decrypt(mdpEncr, 'utf8')
  return decrypted == decryptedbdd
}


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})