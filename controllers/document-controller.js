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
exports.form2 = function (req, res) {
  res.render('form-step-2', {
      surname:req.body.surname,
      name:req.body.name,
      fathername:req.body.fathername,
      ipn:req.body.ipn,
      datebirsday:req.body.datebirsday,
      phone:req.body.phone
  })
}

//створення json файла

exports.showDoc = function (req, res) {
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
    res.render('document-confirmation',{
      contacts:list,
      surname:req.body.surname,
      name:req.body.name,
      fathername:req.body.fathername,
      ipn:req.body.ipn,
      datebirsday:req.body.datebirsday,
      phone:req.body.phone
    })
}


exports.delete = function (req, res) {
  console.log(req.body);
  var fileid=req.body.ipn + ".json";
  var list = []
    try {
      if (fs.existsSync(fileid)) {
        list=fs.readFileSync(fileid, 'utf-8')
        list=JSON.parse(list)
      }
    } catch(err) {
      console.error(err)
    }
    list.splice(req.params.id, 1)
    fs.writeFileSync(fileid, JSON.stringify(list))
    res.redirect("/")
  }


exports.edit = function (req, res) {
  console.log(req.body);
  var fileid="3141502910" + ".json";
  var list = []
    try {
      if (fs.existsSync(fileid)) {
        list=fs.readFileSync(fileid, 'utf-8')
        list=JSON.parse(list)
      }
    } catch(err) {
      console.error(err)
    }
    var contact=list[req.params.id]
    contact.id=req.params.id
    res.render("edit-form",{
      contact
    })
  }


exports.update = function (req, res)  {
    console.log(req.body);
    var fileid=req.body.ipn + ".json";
    var list = []
      try {
        if (fs.existsSync(fileid)) {
          list=fs.readFileSync(fileid, 'utf-8')
          list=JSON.parse(list)
        }
      } catch(err) {
        console.error(err)
      }
        var contact_new={
          surname:req.body.surname,
          name:req.body.name,
          fathername:req.body.fathername,
          ipn:req.body.ipn,
          datebirsday:req.body.datebirsday,
          phone:req.body.phone,
          seria:req.body.seria,
          number:req.body.number,
          dateissue:req.body.dateissue,
          authority:req.body.authority,
          city:req.body.city,
          street:req.body.street,
          house:req.body.house
        }
      list[req.body.contact_id]= contact_new
      fs.writeFileSync(fileid, JSON.stringify(list))
      res.redirect("/")
    }
