const stockname = document.getElementById('stockname');
const submitbtn = document.getElementById('submitbtn');
const getchart = document.getElementById('showchart');
const week = document.getElementById('oneweek');
const month = document.getElementById('onemonth');
const month3 = document.getElementById('month3');
const all = document.getElementById('all');

let datee = [];
let pricee = [];
let vol = [];


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



    stockData = await getdata(stockname.value);


    //way to fetch data form the API
    if (stockData && stockData["Time Series (Daily)"]) {
        const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];
        const latestData = stockData["Time Series (Daily)"][lastRefreshed];

        const openPrice = latestData["1. open"];
        const highPrice = latestData["2. high"];
        const lowPrice = latestData["3. low"];
        const closePrice = latestData["4. close"];
        const volume = latestData["5. volume"];

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

        // console.log(dailyData);
        let arr = [];

        for (let date in dailyData) {
            if (dailyData.hasOwnProperty(date)) {
                // let row = [
                //     date,
                //     dailyData[date]["1. open"],
                //     dailyData[date]["2. high"],
                //     dailyData[date]["3. low"],
                //     dailyData[date]["4. close"],
                //     dailyData[date]["5. volume"]
                // ];
                datee.push(date);
                pricee.push(dailyData[date]["1. open"]);
                vol.push(dailyData[date]["5. volume"] / 100000);

            }
        }
        console.log(datee)
        console.log(pricee)
        console.log(vol)
        // console.log(arr);
    } else {
        console.log("No data available for the given stock symbol.");
    }

    runweek();

})


let myChart;
async function chartfun(date, price) {
    console.log("its running");
    const ctx = document.getElementById('myChart').getContext('2d');;

    if (myChart) {
        // If the chart already exists, update it
        myChart.data.labels = date;  // Update the labels
        myChart.data.datasets[0].data = price;  // Update the data
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
                        data: price,
                        // fill: true,
                        pointRadius: 1,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.05,
                        yAxisid: 'y-axis-price'
                    }
                    // , {
                    //     type: 'bar',
                    //     label: 'Volume',
                    //     data: vol,
                    //     fill: true,
                    //     borderColor: 'rgb(0,0,0)',
                    //     yAxisid: 'y-axis-vol'
                    // }
                ]
            },
            options: {
                scales: {
                    x: {
                        display: false
                    },
                    // y: {
                    //     type: 'number',
                    //     easing: 'linear',
                    //     duration: delayBetweenPoints,
                    //     from: previousY,
                    //     delay(ctx) {
                    //       if (ctx.type !== 'data' || ctx.yStarted) {
                    //         return 0;
                    //       }
                    //       ctx.yStarted = true;
                    //       return ctx.index * delayBetweenPoints;
                    //     }
                    // },
                    // 'y-axis-vol': {
                    //     display: false,
                    //     // type: 'not-linear',
                    //     position: 'right', // The secondary y-axis
                    //     beginAtZero: false,
                    //     ticks: {
                    //         color: 'rgba(54, 162, 235, 1)'
                    //     },
                    //     grid: {
                    //         drawOnChartArea: false // You can control whether this grid shows or not
                    //     }
                    // }
                },
                'y-axis-price': {
                    display: true,
                    // min: 10,
                    type: 'linear',
                    position: 'left', // The primary y-axis
                    beginAtZero: false,

                    ticks: {
                        color: 'rgba(255, 99, 132, 1)'
                    },
                    grid: {
                        drawOnChartArea: true, // Only want the grid lines for one axis
                        display: true
                    }
                },
                // animation: {
                //     tension: {
                //         duration: 10000,
                //         easing: 'easeInOutBounce',
                //         from: 1,
                //         to: 0,
                //         loop: true
                //     }
            
                // }
            }
        });
        // mixedChart = new Chart(ctx, {
        //     data: {
        //         datasets: [{
        //             type: 'bar',
        //             label: 'Bar Dataset',
        //             data: [10, 20, 30, 40]
        //         }, {
        //             type: 'line',
        //             label: 'Line Dataset',
        //             data: [50, 50, 50, 50],
        //         }],
        //         labels: ['January', 'February', 'March', 'April']
        //     },
        //     options: options
        // });
    }
}

function runweek() {
    const date = []
    const price = []
    for (let i = 0; i < 5; i++) {
        date.push(datee[i])
        price.push(pricee[i]);
    }
    date.reverse()
    price.reverse()
    destroyChart();
    chartfun(date, price)
}

week.addEventListener('click', () => {
    runweek();
})

month.addEventListener('click', () => {
    destroyChart();
    const date = []
    const price = []
    for (let i = 0; i < 30; i++) {
        date.push(datee[i])
        price.push(pricee[i]);
    }
    date.reverse()
    price.reverse()
    chartfun(date, price)
})

month3.addEventListener('click', () => {
    destroyChart();
    console.log("3month")
    const date = []
    const price = []
    for (let i = 0; i < 90; i++) {
        date.push(datee[i])
        price.push(pricee[i]);
    }
    date.reverse()
    price.reverse()
    chartfun(date, price)
})

all.addEventListener('click', () => {
    console.log("for all")
    destroyChart();
    const date = [...datee].reverse();
    const price = [...pricee].reverse();

    // date.reverse()
    // price.reverse()

    // console.log(datee);
    // console.log(date);
    chartfun(date, price)
})

function destroyChart() {
    console.log("destory")

    if (myChart) {
        myChart.destroy();
        myChart = null;  // Clear the chart instance
    }
}