(()=>{
    const tcx =document.getElementById('temp-chart');
    const hcx =document.getElementById('humid-chart');
    const scx =document.getElementById('sohum-chart');
    Chart.defaults.font.size = 16;

    const temperature = document.getElementById('temperature');
    const airHumidity = document.getElementById('air-humidity');    
    const soilHumidity = document.getElementById('soil-humidity');

    const fanOn = document.getElementById('fan-on');
    const fanOff = document.getElementById('fan-off');
    const pumpOn = document.getElementById('pump-on');   
    const pumpOff = document.getElementById('pump-off');

    // Datasets
    // [0]Temperature
    // [1]Air Humidity
    // [2]Soil Humidity

    const updateCharts = (temp, humid) => {
        const id = location.href.split('/').pop();
        temp.data.labels = [];
        humid.data.labels = [];
        temp.data.datasets[0].data = [];
        humid.data.datasets[0].data = [];
        humid.data.datasets[1].data = [];
        fetch(`/dashboard/api?q=${id}`)
        .then(res => res.json())
        .then(res => {
            const keys = Object.keys(res);
            keys.forEach(key => {
                const label = new Date(Number(key)).toISOString().split('.')[0].split('T')[1];
                temp.data.labels.push(label);
                humid.data.labels.push(label);

                temp.data.datasets[0].data.push(res[key].temperature);
                humid.data.datasets[0].data.push(res[key].humidity);
                humid.data.datasets[1].data.push(res[key].soilhumidity);
            });
            temp.update();
            humid.update();
            const last = keys.pop();
            temperature.innerText = res[last].temperature + '°C';
            airHumidity.innerText = res[last].humidity + '%';
            soilHumidity.innerText = res[last].soilhumidity + '%';

            if(res[last].fan === 1){
                fanOn.classList.remove('hidden');
                fanOff.classList.add('hidden');
            } else {
                fanOff.classList.remove('hidden');
                fanOn.classList.add('hidden');
            }

            if(res[last].waterpump === 1){
                pumpOn.classList.remove('hidden');
                pumpOff.classList.add('hidden');
            } else {
                pumpOff.classList.remove('hidden');
                pumpOn.classList.add('hidden');
            }
        });
    }

    // tcx
    // hcx
    // scx
    const tchart = new Chart(tcx, {
        type: 'line',
        data: {
            zoomEnabled: true,
            labels: [],
            datasets: [
                {
                    label: 'Temperatura',
                    data: [],
                    borderWidth: 2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Geologica'
                        }
                    }
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        font: {
                            size: 10
                        },
                        // display: false
                        maxTicksLimit: 5, // labels.length / 2
                        // maxRotation: 90,
                        // minRotation: 90
                    }
                }
            },
            // mantainAspectRatio: false,
            aspectRatio: 2
        }
    });

    const hchart = new Chart(hcx, {
        type: 'line',
        data: {
            zoomEnabled: true,
            labels: [],
            datasets: [
                {
                    label: 'Humedad del aire',
                    data: [],
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: 'Humedad del suelo',
                    data: [],
                    borderWidth: 2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Geologica'
                        }
                    }
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        font: {
                            size: 10
                        },
                        // display: false
                        maxTicksLimit: 5, // labels.length / 2
                        // maxRotation: 90,
                        // minRotation: 90
                    }
                }
            },
            // mantainAspectRatio: false,
            aspectRatio: 2
        }
    });

    updateCharts(tchart, hchart);
    
    setInterval(() => {
        updateCharts(tchart, hchart);
    },6000)
    
})()

