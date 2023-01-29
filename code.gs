function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

var url = 'https://docs.google.com/spreadsheets/d/1_zLriCfKXmxd90IVQv96m5TIX4EkHOK7IBuEvpBMJ7k/edit#gid=0'
var sh = 'File'
var folderId = '1eKuvEqPWcHqD0pqDSgD0hu91A4RoiajR'

function processForm(formdata){
  var superscript = SuperScript.initSuper(url,sh)
  var formObject = {}
  formdata.forEach(element => formObject[element.name] = element.value)
  var file = superscript.uploadFile(folderId,formObject.myfile.data,formObject.myfile.name,formObject.myfile.data)
  var ss= SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheets()[0]
   ws.appendRow([
     new Date(),
    formObject.nama, 
    formObject.bagian,
    "'"+formObject.jenis,
    formObject.jumlah,
    "'"+formObject.satuan,
    formObject.uraian,
     file.getUrl()
  ]);
}

