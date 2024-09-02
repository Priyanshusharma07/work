const stockname = document.getElementById('stockname');
const submitbtn = document.getElementById('submitbtn');
const getchart = document.getElementById('showchart');
const week = document.getElementById('oneweek');
const month = document.getElementById('onemonth');
const month3 = document.getElementById('month3');
const all = document.getElementById('all');
let volume=document.getElementById('volume');
let candle=document.getElementById('candle');


let datee = [];
//at a perticulare date the opening price of the stocke
let oprice = [];

//at a perticulare price the vol of the stock
let vol = [];

//at a perticular price what is the day_HL high and low 
let day_HL = [];

// this store the open and close of a perticular day
let day_oc = [];

let stockData = null;
async function getdata(stockname) {
    try {
        console.log(stockname)
        // const data = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockname}.BSE&outputsize=full&apikey=8YRAN4KJAS4TBDPO`)
        const data = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`)
        // const data = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=tatasteel.BSE&apikey=8YRAN4KJAS4TBDPO`)

        return await data.json();
    } catch (error) {
        alert("Please entre a valid value")
    }
}



submitbtn.addEventListener('click', async () => {


    ///-------
    stockData = await getdata(stockname.value);
    // stockData = await getdata(stockname.value);


    //way to fetch data form the API
    if (stockData && stockData["Time Series (Daily)"]) {
        const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];
        const latestData = stockData["Time Series (Daily)"][lastRefreshed];

        // const openPrice = latestData["1. open"];
        // const highPrice = latestData["2. high"];
        // const lowPrice = latestData["3. low"];
        // const closePrice = latestData["4. close"];
        // const volume = latestData["5. volume"];

        // console.log(`Stock: ${stockname.value}`);
        // console.log(`Date: ${lastRefreshed}`);
        // console.log(`Open: ${openPrice}`);
        // console.log(`High: ${highPrice}`);
        // console.log(`Low: ${lowPrice}`);
        // console.log(`Close: ${closePrice}`);
        // console.log(`Volume: ${volume}`);

        //for the length of an array
        //     objectLength = Object.keys(stockData["Time Series (Daily)"]).length;
        // console.log(objectLength);

        // console.log(stockData["Time Series (Daily)"]);


        const dailyData = stockData["Time Series (Daily)"];



        for (let date in dailyData) {
            if (dailyData.hasOwnProperty(date)) {

                datee.push(date);
                oprice.push(dailyData[date]["1. open"]);
                vol.push(dailyData[date]["5. volume"] / 100000);

                ///here we store the day high and low in form of array
                let num = [dailyData[date]["2. high"], dailyData[date]["3. low"]];
                day_HL.push(num);

                ///here we store the open and close of the day
                let n = [dailyData[date]["1. open"], dailyData[date]["4. close"]];
                day_oc.push(n);
            }
        }

        // console.log(datee)
        // console.log(oprice)
        // console.log(vol)
        // console.log(day_HL);
        // console.log(day_oc);
    } else {
        console.log("No data available for the given stock symbol.");
    }



    runweek();

})


let myChart;
async function chartfun(date, open_price, oc_price, lh_price, volume) {
    // console.log(date);
    // console.log(volume);
    // console.log(open_price);
    // console.log(oc_price);
    // console.log(lh_price);
    // console.log(volume);

    const ctx = document.getElementById('myChart').getContext('2d');
    //---------

    if (myChart) {
        // If the chart already exists, update it
        myChart.data.labels = date;  // Update the labels
        myChart.data.datasets[0].data = open_price;  // Update the data
        myChart.update();  // Re-render the chart with the new data
    } else {

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [
                    {
                        type: 'line',
                        label: 'Price',
                        data: open_price,
                        pointRadius: 1,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.05,
                        yAxisID: 'y-axis-price'
                    }
                    , {
                        
                        type: 'bar',
                        label: 'Volume',
                        data: volume,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        
                        yAxisID: 'y-axis-vol',

                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        display: false,
                    },
                    'y-axis-price': {
                        type: 'linear',
                        position: 'left',
                        display:true,
                        beginAtZero: false,
                        ticks: {
                            color: 'rgba(255, 99, 132, 1)',
                        },
                        grid: {
                            drawOnChartArea: true,
                        },
                    },
                    'y-axis-vol': {
                        type: 'linear',
                        position: 'right',
                        display:false,
                        beginAtZero: true,
                        ticks: {
                            color: 'rgba(54, 162, 235, 1)',
                        },
                        grid: {
                            drawOnChartArea: false, // Disable grid lines for volume to make the chart cleaner
                        },
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });
    }
}


async function chartfun_candle(date, open_price, oc_price, lh_price, volume) {
    // console.log(date);
    // console.log(volume);
    // console.log(open_price);
    // console.log(oc_price);
    // console.log(lh_price);
    // console.log(volume);




    const ctx = document.getElementById('myChart').getContext('2d');
    //---------

    if (myChart) {
        // If the chart already exists, update it
        myChart.data.labels = date;  // Update the labels
        myChart.data.datasets[0].data = price;  // Update the data
        myChart.update();  // Re-render the chart with the new data
    } else {

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: date,
                datasets: [
                    {
                        order: 1,
                        type: 'bar',
                        label: 'Price',
                        data: oc_price,
                        pointRadius: 1,
                        backgroundColor: 'rgb(6, 148, 6)',
                        borderColor: 'rgb(6, 148, 6)',
                        tension: 0.05,
                        yAxisID: 'y-axis-price',
                    },
                    {
                        order: 2,
                        type: 'bar',
                        label: 'Low High',
                        data: lh_price,
                        categoryPercentage: 0.02,
                        backgroundColor: 'rgb(0,0,0)',
                        borderColor: 'rgb(0,0,0)',
                        // yAxisID: 'lowhighid',
                    }


                ]
            },
            options: {
                scales: {
                    x: {
                        display: false,
                        stacked: true // Ensure this is set to false to display side by side
                    },
                    'y-axis-price': {
                        type: 'linear',
                        position: 'left',
                        beginAtZero: false,
                        ticks: {
                            color: 'rgb(31, 120, 50)',
                        },
                        grid: {
                            drawOnChartArea: true,
                        },
                        display: true
                    },
                    y: {
                        display: false
                    },
                }
            }
        });

    }
}
// open_price is known as the Open price of that day which can be use in line chart

function runweek() {
    const date = []
    const open_price = []
    const oc_price = []
    const volume = []
    const lh_price = [];

    for (let i = 0; i < 5; i++) {
        date.push(datee[i])
        open_price.push(oprice[i]);

        let num = [day_oc[i][0], day_oc[i][1]];
        oc_price.push(num);

        let n = [day_HL[i][0], day_HL[i][1]];
        lh_price.push(n)

        volume.push(vol[i]);
    }
    date.reverse()
    open_price.reverse()
    oc_price.reverse();
    lh_price.reverse();
    volume.reverse();
    // console.log(oc_price)


    destroyChart();
    chartfun_candle(date, open_price, oc_price, lh_price, volume)

}

week.addEventListener('click', () => {
    runweek();
})

month.addEventListener('click', () => {
    const date = []
    const open_price = []
    const oc_price = []
    const volume = []
    const lh_price = [];


    for (let i = 0; i < 30; i++) {
        let num = [day_oc[i][0], day_oc[i][1]];
        date.push(datee[i])
        open_price.push(oprice[i]);
        oc_price.push(num);

        let n = [day_HL[i][0], day_HL[i][1]];
        lh_price.push(n)

        volume.push(vol[i]);
    }
    date.reverse()
    open_price.reverse()
    oc_price.reverse();
    lh_price.reverse();
    volume.reverse();


    destroyChart();
    chartfun(date, open_price, oc_price, lh_price, volume)

})

month3.addEventListener('click', () => {
    console.log("3month")
    const date = []
    const open_price = []
    const oc_price = []
    const volume = []
    const lh_price = [];


    for (let i = 0; i < 90; i++) {
        let num = [day_oc[i][0], day_oc[i][1]];
        date.push(datee[i])
        open_price.push(oprice[i]);
        oc_price.push(num);

        let n = [day_HL[i][0], day_HL[i][1]];
        lh_price.push(n)

        volume.push(vol[i]);
    }
    date.reverse()
    open_price.reverse()
    oc_price.reverse();
    lh_price.reverse();
    volume.reverse();

    destroyChart();
    chartfun(date, open_price, oc_price, lh_price, volume)

})

all.addEventListener('click', () => {
    console.log("for all")
    destroyChart();
    const date = [...datee].reverse();
    const open_price = [...oprice].reverse();
    const oc_price = [...day_oc].reverse();
    const volume = [...vol].reverse();
    const lh_price = [...day_HL].reverse();

    // date.reverse()
    // price.reverse()

    // console.log(day_HL);
    // console.log(oc_price);
    // console.log()
    chartfun(date, open_price, oc_price, lh_price, volume)
})

function destroyChart() {
    console.log("destory")

    if (myChart) {
        myChart.destroy();
        myChart = null;  // Clear the chart instance
    }
}