const express = require('express');
const xlsx = require('xlsx')
const path = require('path')
const fileUpload = require('express-fileupload')
const app = express();


app.set('view engine', 'ejs')
app.set('views', 'Server/views')

app.use(express.static('./Server/public'))

const filepath = path.resolve(__dirname, 'test.xlsx');

app.get('/',(req,res)=>{
    res.render('head',{title:'Home'})
})
app.get('/data', (req, res) => {
    // console.log(data)
    let workbook = xlsx.readFile(filepath);
    let sheetNames = workbook.SheetNames;

    let data = {
        //send multiple data arrays directly using object rather than separately
        //getting get requests everytime cache it once
        safetyPlan: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]),
        trcfr: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[1]]),
        actionPlan: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[2]]),

    }
    res.send(data);
});

app.get('/safety', (req, res) => {
    res.render('Safety/index',{title:'Safety'});
    // res.end();
});

app.get('/quality',(req,res)=>{
    res.render('Quality/index',{title:'Quality'});
})

app.post('/import_excel',
    fileUpload({createParentPath:true}),(req,res) =>{
    const files = req.files
    console.log(files)
    Object.keys(files).forEach(key=>{
        const filepath = path.join(__dirname,'test.xlsx')
        files[key].mv(filepath,(err)=>{
            if(err)
            return res.status(500).json({status:"error",message:err})
        })
    })
    })
    

app.listen(5000, () => {
    console.log('Server up and running on port 5000');
})