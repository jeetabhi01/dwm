
const action = document.getElementById('plan');


async function getActionData() {
    const data = await fetch('http://localhost:5000/action').then(data => {
        return data.json();
    })
    return data;
}

async function createTable() {

    let data = await getActionData();
    data.forEach(obj => {
        const tr = document.createElement('tr')
        Object.values(obj).forEach((td,index) => {
            const tdata = document.createElement('td');
            if(index===1){
            let date = new Date(td)
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDay();
                const formattedDate = new Date(year, month - 1,day).toLocaleString('default', { month: 'short', year: 'numeric',day:'2-digit'}); 
            tdata.innerText = formattedDate;
            tr.appendChild(tdata);
            }
            else{
            tdata.innerText = td;
            tr.appendChild(tdata);
            }
        })
        action.appendChild(tr);
    });

}

createTable()

