exports.writeSessionOrang = function(req, res){
  let data_user = JSON.parse(JSON.stringify(req.user))
  // console.log(data_user)
  return data_user[0];
}

exports.getDate = async() =>{
  // var dateObj = new Date();
  // var month = await dateObj.getUTCMonth() + 1; //months from 1-12
  // var day = await dateObj.getUTCDate();
  // var year = await dateObj.getUTCFullYear();

  // newdate = year + "-" + month + "-" + day;
  let newdate = new Date().toISOString().slice(0, 10)
  return newdate

}

exports.getDateTimestamp = async() =>{
  let newdate = new Date().toLocaleString();
  return newdate
}
