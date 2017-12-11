var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

function upload_doc(real_data){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //var myobj = { name: "Company Inc", address: "Highway 37" };
  db.collection("users").insertMany(real_data, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

$(this).prop('disabled', true);
$('.ui.basic.modal').modal('show');


};
