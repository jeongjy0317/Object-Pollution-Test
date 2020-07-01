var express = require('express');
var router = express.Router();
const bodyparser = require("body-parser");

const isObject = (container) => {
  if( typeof container !== "object" ) return true
  return false
}

const merge = (a, b) => {
  for (let key in b){
    if(isObject(a[key]) && isObject(b[key])){
      merge(a[key], b[key])
    }else{
      a[key] = b[key]
    }
    return a
  }
}

const clone = (obj) => {
  return merge({}, obj)
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  console.log(req.params)
  const obj1 = clone(req.params)
  const obj2 = { name: 'protected', created: new Date() }
  if(obj2.status === "polluted"){
    obj2.flag = "THIS IS SUPER FLAG"
    res.status(200).json(obj2.flag)
    console.log("[POLLUTED] KILL PROCESS => " + process.pid)
    return
  }
  return res.status(200).json({obj1, obj2})
})

router.get('/hello', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// module.use(bodyparser.json())
module.exports = router;


