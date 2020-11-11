const fs = require('fs');

exports.methodName = function (req, res) {
  res.send('methodName works')
}
// КРОК 1
//відмальовка form-step-1 методом GET
//введення даних та відправка їх
exports.form = function (req, res) {
  // Do your magic
  res.render('form-step-1', {
    example: 'example data to template'
  })
}

//КРОК 2
//збереження даних з form-step-1 у req.body
//перхід методо POST на другу сторінку
//заповнення даних на другій сторінці
//
exports.step2 = function (req, res) {
  res.render('form-step-2', {
      surname:req.body.surname,
      name:req.body.name,
      fathername:req.body.fathername,
      ipn:req.body.ipn,
      datebirsday:req.body.datebirsday,
      sex:req.body.sex
  })
}


exports.showDoc = function (req, res) {
  console.log(req.body);
  var fileid=req.body.ipn+".json";
  var list = []
    try {
      if (fs.existsSync(fileid)) {
        list=fs.readFileSync(fileid, 'utf-8')
        list=JSON.parse(list)
      }
    } catch(err) {
      console.error(err)
    }
    list.push(req.body)
    fs.writeFileSync(fileid, JSON.stringify(list))
    console.log('------------');
    console.log(list);
    res.redirect('/')
}