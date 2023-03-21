const express = require('express');
const xlsx = require('xlsx')
const path = require('path')
const app = express();
// const plotly = require('plotly.js')
// const fs = require('fs')
app.set('view engine','ejs')
app.set('views','Server/views')

const filepath = path.resolve(__dirname, 'test.xlsx');
const workbook = xlsx.readFile(filepath);
const sheetNames = workbook.SheetNames;

const data = {
    //send multiple data arrays directly using object rather than separately
    //getting get requests everytime cache it once
    safetyPlan: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]),
    trcfr: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[1]]),
    actionPlan:xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[2]]),

}


app.get('/', (req, res) => {
    res.render('Safety/index')
    // res.end();
});

app.get('/data',(req,res)=>{
    console.log(data)
    res.send(data);
});
app.listen(5000, () => {
    console.log('Server up and running on port 5000');
})