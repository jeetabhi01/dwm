
let myPlot = document.getElementById('myPlot');
var brush = {
    'width': 500,
    'height': 600,
    'path': "M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z"
}

function randomRGB() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let RGBColor = "rgb(" + x + "," + y + "," + z + ")";
    return RGBColor;
}


function getColor(trace1,trace2){
    let color = []
    // console.log(trace1,trace2)
    trace2.forEach( (y,index) =>{
        // console.log(y,trace2[index]);
        if(y>trace1[index]){
            // console.log('executing if')
            color.push('rgb(165 0 0)');
        }
        else
            color.push('rgb(20 0 131)');
    })
    // console.log(color)
    return color;
}
async function createAxisData() {
    let data = await fetch('http://localhost:5000/data').then(data => {
        return data.json();
    })
    let x = [];
    let y1 = [];
    let y2 = [];

    data.forEach((obj) => {
        x.push(obj['month']);
        y1.push(obj['target'])
        y2.push(obj['actual'])
    })
    return ([x, y1, y2])
}
let renderDataAsChart = (data, title) => {
    // console.log(data)
    // console.log(data[0],data[1],data[2])
    let axisData1 = {
        x: data[0],
        y: data[1],
        mode: 'lines+markers',
        name: 'Target',
        line: {
            dash: 'dash',
            width: 1
        },
        hoverinfo: 'y',
        marker: {
            color:'#2f6600'
        }
    };

    let axisData2 = {
        x: data[0],
        y: data[2],
        type: 'bar',
        name: 'Actual',
        hoverinfo: 'y',
        marker: {
            color: getColor(data[1],data[2])
        }
    };

    let layout = {
        title: title,
        autosize: true,
    }
    let config = {
        responsive: true,
        displaylogo: false,

        modeBarButtonsToAdd: [

            {
                name: 'Toggle color',
                icon: brush,
                click: function (gd) {
                    let color = randomRGB()
                    // console.log(color)
                    axisData1.marker['color'] = color;
                    Plotly.restyle(gd, "axisData1.marker.color", color)
                }
            }
        ],
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
    }

    axisData1['text'] = axisData1['y'].map(String)
    axisData2['text'] = axisData2['y'].map(String)
    Plotly.newPlot(myPlot, [axisData1, axisData2], layout, config)

}
createAxisData().then((axisdata) => {
    renderDataAsChart(axisdata, 'Target vs Actual')
})