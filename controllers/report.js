const fs = require('fs');
const puppeteer = require('puppeteer');
const util = require('../util/util')
const model = require('../models/m_report')
const hbs = require('hbs')
var pdf = require('html-pdf');

const buildPathHtml = './views/build-report/report.hbs'
const buildPathPdf  ='./views/build-report/report.pdf'

function createField(fields){
  let string = '<tr>'
  for(let i = 0; i < fields.length; i++){
     string +='<td>'+fields[i]+'</td>'
  }

  string += '</tr>'

  return string
}

function createRows(fields, rows){
  let string = ''
  for(let i = 0; i < rows.length; i++ ){
    string += '<tr>'
      for(let j = 0; j < fields.length; j++){
        string += '<td>'+rows[i][fields[j]]+'</td>'
      }

    string += '</tr>'
  }
  
  return string
}

function createTable(fields, rows){
  return '<table>'+fields+rows+'</table>'
}

// const createHtml = (table) => `
//   <html>
//     <head>
//       <style>
//         table {
//           width: 100%;
//         }
//         tr {
//           text-align: left;
//           border: 1px solid black;
//         }
//         th, td {
//           padding: 15px;
//         }
//         tr:nth-child(odd) {
//           background: #CCC
//         }
//         tr:nth-child(even) {
//           background: #FFF
//         }
//         .no-content {
//           background-color: red;
//         }
//       </style>
//     </head>
//     <body>
//     <table width="100%">
//       <tr>
//       <td align="center" style ="background: #FFF"><img style="display:block; vertical-align: bottom;" src="http://localhost:8000/static/image/logo5.jpg" width="100%"></td>
//       </tr>
//     </table>
//     <hr>
//       ${table}
//     </body>
//   </html>
// `;

const createHtml = (table, kode_data) => {
let judul = '-'

if(kode_data == '01'){
  judul = 'Data Detail Kapal'
}else if(kode_data == '02'){
  judul = 'Data Sepesifikasi Dimensi Kapal'
}else if(kode_data == '03'){
  judul = 'Data Sepesifikasi Mesin Kapal'
}else if(kode_data == '04'){
  judul = 'Data Kordinat Kapal'
}else if(kode_data == '05'){
  judul = 'Data Kapal Pelabuhan Terakhir Disinggahi'
}else if(kode_data == '06'){
  judul = 'Data Kapal Pelabuhan Terdekat Radius 10KM'
}else if(kode_data == '07'){
  judul = 'Data Kepemilikan Kapal'
}else if(kode_data == '08'){
  judul = 'Data Tujuan Kapal'
}else if(kode_data == '09'){
  judul = 'Data Pelabuhan'
}else if(kode_data == '10'){
  judul = 'Data Waktu Pelaporan AIS Kapal dan Perekaman/Update Data'
}

let data =  `<html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
    <table width="100%">
      <tr>
      <td align="center" style ="background: #FFF"><img style="display:block; vertical-align: bottom;" src="http://localhost:8000/static/image/logo5.jpg" width="100%"></td>
      </tr>
    </table>
    <br>
    <center><h1>`+judul+`</h1></center>
    <br>
    <hr>
      ${table}
    </body>
  </html>
`
return data
};

const doesFileExist = (filePath) => {
	try {
		fs.statSync(filePath); // get information of the specified file path.
		return true;
	} catch (error) {
		return false;
	}
};

const printPdf = async () => {
  console.log('Starting: Generating PDF Process, Kindly wait ..');
  /** Launch a headleass browser */
  const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
  /* 1- Ccreate a newPage() object. It is created in default browser context. */
  const page = await browser.newPage();
  /* 2- Will open our generated `.html` file in the new Page instance. */
  await page.goto('http://localhost:8000/gen_html', { waitUntil: 'networkidle0' });
  /* 3- Take a snapshot of the PDF */
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '100px',
      bottom: '200px',
      right: '30px',
      left: '30px',
    }
  });
  /* 4- Cleanup: close browser. */
  await browser.close();
  console.log('Ending: Generating PDF Process');
  return pdf;
};


//untuk test
async function generateReport(kode_data, res){
  try {
    console.log(kode_data)
    model.getData(kode_data , async function(err, data){
      // console.log(data.result)

      if(data.result.length > 0){

        if (doesFileExist(buildPathHtml)) {
          await fs.unlinkSync(buildPathHtml)
          // await fs.unlinkSync(buildPathPdf)
          console.log('Deleting old build file');

        }


        var uniqueKeys = await Object.keys(data.result.reduce(function(result, obj) {
          return Object.assign(result, obj);
        }, {}))

        const fields = await createField(uniqueKeys)
        const rows =  await createRows(uniqueKeys, data.result)
        const table = await createTable(fields,rows)

        const html = await createHtml(table)

        // console.log(html)
        await fs.writeFileSync(buildPathHtml, html);
        let htmlx = fs.readFileSync(buildPathHtml, 'utf8');
        var options = { 
          // "phantomPath": "../node_modules/phantomjs/bin/phantomjs", 
          format: 'Letter'
        };

        res.setHeader('Content-type', 'application/pdf');
        pdf.create(htmlx).toStream(function(err, stream){
          // if (err) return console.log(err);
          // res.type('pdf');
          stream.pipe(res);
          // stream.pipe(fs.createWriteStream('./report.pdf'));
          // res.send(JSON.stringify({kode : '200', message : 'OK'}))

        });

        console.log('Succesfully created an HTML table');

        // const pdf = await printPdf();
        // await fs.writeFileSync(buildPathPdf, pdf);
        // console.log('Succesfully created an PDF table');

        // const file = fs.createReadStream('./views/build-report/report.pdf');
        // const stat = fs.statSync('./views/build-report/report.pdf');
        // res.setHeader('Content-Length', stat.size);
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        // file.pipe(res);
        // res.download('./views/build-report/report.pdf')
        // console.log('end of content pdf and dowload it')
        // res.send(JSON.stringify({kode : '200', message : 'OK'}))

      }else{
        res.send(JSON.stringify({kode : '500', message : 'Data Kosong'}))
        console.log('Data Kosong Bero');
      }
      
    })
  } catch (error) {
    res.send(JSON.stringify({kode : '500', message : 'Error dalam generate PDF'}))
    console.log('Error generating table', error);
  }
} 

async function generateReport2(kode_data, res){
  try {
    console.log(kode_data)
    model.getData(kode_data , async function(err, data){
      // console.log(data.result)

      if(data.result.length > 0){

        if (doesFileExist(buildPathHtml)) {
          await fs.unlinkSync(buildPathHtml)
          // await fs.unlinkSync(buildPathPdf)
          console.log('Deleting old build file');

        }


        var uniqueKeys = await Object.keys(data.result.reduce(function(result, obj) {
          return Object.assign(result, obj);
        }, {}))

        const fields = await createField(uniqueKeys)
        const rows =  await createRows(uniqueKeys, data.result)
        const table = await createTable(fields,rows)

        const html = await createHtml(table, kode_data)
        console.log('Succesfully created an HTML table');
        // console.log(html)
        await fs.writeFileSync(buildPathHtml, html);
        let htmlx = fs.readFileSync(buildPathHtml, 'utf8');
        var options = { 
          // "phantomPath": "../node_modules/phantomjs/bin/phantomjs", 
          format: 'Letter' 
        };

        res.setHeader('Content-type', 'application/pdf');
        pdf.create(htmlx).toStream(function(err, stream){
          stream.pipe(res);
          console.log('sukses kirim pdf')
        });

      }else{
        res.send(JSON.stringify({kode : '500', message : 'Data Kosong'}))
        console.log('Data Kosong Bero');
      }
      
    })
  } catch (error) {
    res.send(JSON.stringify({kode : '500', message : 'Error dalam generate PDF'}))
    console.log('Error generating table', error);
  }
} 

// yang beneran
exports.getHTML = function(req, res){   
  res.render('build-report/report')
}

exports.report = function(req,res){
  let sess = util.writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( './views/layout/report.html', 'utf8'));
  res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user']})
}

exports.genReport = async function(req,res){
  let type_data = req.body.type_data
  
  await generateReport(type_data,res)
}

exports.genReport2 = async function(req,res){
  let type_data = req.params.id
  
  await generateReport2(type_data,res)
}

exports.getFile = function(req,res){
  const file = fs.createReadStream('./views/build-report/report.pdf');
  const stat = fs.statSync('./views/build-report/report.pdf');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  file.pipe(res);
}

exports.test = function(req, res){
  console.log(req);
  res.send('OK')
}