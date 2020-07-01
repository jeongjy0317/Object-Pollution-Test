const express = require('express')
const app = express()
app.set('view engine','ejs');
app.set('views','../views');
app.use(express.json());
const port = 1234

const isObject = (object) => { return object !== null && typeof(object) === 'object'; }
const merge = (a, b) =>{
  for (let key in b){
    if(isObject(a[key]) && isObject(b[key])){
      merge(a[key], b[key])
    }else{
      a[key] = b[key]
    }
    return a
  }
}
const clone = (obj) => { return merge({}, obj); }

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', { title: 'Object Pollution Test' })
});

app.post('/', (req, res) => {
  console.log(req.body);
  const obj = clone(req.body);
  const r = {};
  res.send(r.status ? r.status: 'Normal');
})

app.listen(port, () => console.log(`Opening server : ${port}`))