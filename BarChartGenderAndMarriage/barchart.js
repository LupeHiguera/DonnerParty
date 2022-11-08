var demoData = {
    "maleMarried": 0,
    "maleSingle": 0,
    "femaleMarried": 0,
    "femaleSingle": 0,
    "totalMales" : 0,
    "totalFemales" : 0,
    "totalSingles" : 0,
    "totalMarried" : 0,
}

document.addEventListener('DOMContentLoaded', function () {
    // reads data into countryList
    Promise.all([d3.csv('Data/donner_party_full_data.csv')])
        .then(function (values) {
            console.log(values[0]);
            var data = values[0];
            var holder;
            for(var i = 0; i < data.length; i++){
                holder = data[i];
                if(holder["Sex"] == "M"){
                    demoData.totalMales++;
                    if(holder["Marital Status"] == "M"){
                        demoData.maleMarried++;
                        demoData.totalMarried++;
                    }
                    else if(holder["Marital Status"] == "S"){
                        demoData.maleSingle++;
                        demoData.totalSingles++;
                    }
                }
                else if(holder["Sex"] == "F"){
                    demoData.totalFemales++;
                    if(holder["Marital Status"] == "M"){
                        demoData.femaleMarried++;
                        demoData.totalMarried++;
                    }
                    else if(holder["Marital Status"] == "S"){
                        demoData.femaleSingle++;
                        demoData.totalSingles++;
                    }
                }
            }
            console.log(demoData);
        })
    DrawBarCharts();
});

function DrawBarCharts(){
    
}