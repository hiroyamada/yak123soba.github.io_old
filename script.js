
function loadPage() {

/*
    //adjust font size of time and date
    $(".text_filler").each(function() {
        var goal_height = $(this).parent().height() * 0.8;
        var fontSize = parseInt($(this).css("font-size"));

        console.log(goal_height);
        console.log($(this).height());

        while ($(this).height() <= goal_height){
            ratio = goal_height / $(this).height();
            fontSize = fontSize * ratio;
            $(this).css("font-size", fontSize);
        }      
    })
*/

    setDate();
    startTime();

    loadWeather();

    //change key eventually.
    $.ajax({
        url: 'https://transloc-api-1-2.p.mashape.com/arrival-estimates.json?agencies=52&callback=call&stops=4070642', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method
        data: {}, // Additional parameters here
        datatype: 'json',
        success: onShuttleDataReceive,
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "EwYpiqGmJnmshhBooH1Ihcp2rfDsp1UAd9ujsn6rdEj2C96gfI"); // Enter here your Mashape key
    }
    });
}

function onShuttleDataReceive(data) {
    for (var i = 0; i < data.data.length; i++) {

    }
}

function setDate() {
    var today=new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var dd = today.getDate();
    var mm = month[today.getMonth()]; //January is 0!
    var day = weekday[today.getDay()];

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 
    document.getElementById('date_span').innerText=day+", "+mm+' '+dd;
}

function loadWeather() {
    $.ajax({
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/weather?id=4931972&units=imperial",
        data: {},
        success: onWeatherLoaded
    })
}

function onWeatherLoaded(data) {
    $("#weather_desc").html(parseInt(data.main.temp) + "&deg F<br>" + data.weather[0].main);
}


function startTime() {
    var today=new Date();
    var d=today.getDate();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock_span').innerText = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}