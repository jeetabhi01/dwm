const select = document.getElementById('delete')
// console.log(select)
async function getOptionData() {
    let data = await fetch('http://localhost:5000/data').then(data => {
        return data.json();
    })
    data.forEach(element=>{
        const opt = document.createElement('option');
        opt.text = element['month'];
        console.log(opt)
        select.appendChild(opt)
    })
    
}

getOptionData();