
var days = [
    0, //monday
    1, //tuesday
    2, //wednesday
    3, //etc...
    4,
    5,
    6,
]

function pad(number, length){
    var str = "" + number
    while (str.length < length) {
        str = '0'+str
    }
    return str
}

function monthName(month){
    var monthNames = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June",
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];

    return monthNames[month.getMonth()]; 
}

function holidays(month){
    return [];
}

function requiredMonths(startDate, numberOfDays){
    // Returns all the months at will need to be rendered, starting
    // at startDate and going numberOfDays into the future.
    // returns the data as full date objects, with the day of 
    // the month equal to 1, for convenience later.

    // make a copy of the startDate, so we don't change it's value
    // outside of this function

    var startDate = new Date(startDate);
    console.log(startDate);

    var months = [];

    var firstMonth = new Date(startDate);
    firstMonth.setDate(1);

    months.push(firstMonth);

    for (var i = 1; i < numberOfDays; i++){
        var alreadyAdded = false;
        startDate.setDate(startDate.getDate() + 1);

        for (var j = 0; j < months.length; j++){
            if (months[j].getMonth() == startDate.getMonth()){
                alreadyAdded = true;
            }
        }

        if (alreadyAdded == false){
            var newMonth = new Date(startDate);
            newMonth.setDate(1);
            months.push(newMonth);
        }
    }

    return months;
}

function renderCalendar(month, startDate, numberOfDays){
    var minDate = new Date(startDate);
    var maxDate = new Date(startDate);
    maxDate.setDate(maxDate.getDate() + numberOfDays - 1);

    console.log(minDate);
    console.log(maxDate);

    var startMonth = month.getMonth(); 
    // saves the month that we start on
    // this will change later on, so we need to know what it is when it starts.

    var html = "";
    html += "<table><thead>";
    html += "<tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>";
    html += "<tr><th colspan=\"7\">" + monthName(month) + " " + month.getFullYear() + "</th></tr>";
    html += "</thead>";

    // first row

    html += "<tbody>";

    while(month.getMonth() == startMonth){
        row = "<tr>";

        for (var i = 0; i < 7; i++){
            if (i == month.getDay()){
                var data = "";
                var cls = "";

                if (month.getMonth() == startMonth && month >= minDate && month <= maxDate){
                    data = month.getDate()

                    if (month.getDay() == 0 || month.getDay() == 6){
                        cls = "weekend";
                    }else{
                        cls = "weekday";
                    }

                }else{
                    data = "&nbsp;";
                    cls = "blankday";    
                }
                
                row += "<td width=\"20px\" class=\"" + cls + "\">" + data + "</td>";

                month.setDate(month.getDate() + 1);
            }else{
                row += "<td width=\"20px\" class=\"blankday\"></td>";
            }
        }

        row += "</tr>";

        html += row;
    }

    html += "</tbody>";

    html += "</table>";
    document.getElementById("generatedCalendars").innerHTML += html;
}

function generateCalendars(){
    var startDate = document.getElementById("startDate").value;
    var numberOfDays = document.getElementById("numberOfDays").value;
    var countryCode = document.getElementById("countryCode").value;

    // adding time and timezone to the start date, based on 
    // user's local time. to avoid the parsed date being off
    // by one day (happened to me, UTC-0600)

    var offset = new Date().getTimezoneOffset();
    offset = ((offset<0? '+':'-')+
              pad(parseInt(Math.abs(offset/60)), 2)+
              pad(Math.abs(offset%60), 2))

    var startDate = startDate + " 00:00:00 " + offset;

    // sanitizing input, a little bit

    startDate = new Date(startDate);
    numberOfDays = parseInt(numberOfDays, 10);
    countryCode = countryCode.trim().toUpperCase();

    var months = requiredMonths(startDate, numberOfDays);

    document.getElementById("generatedCalendars").innerHTML = "";

    for (var i = 0; i < months.length; i++){
        renderCalendar(months[i], startDate, numberOfDays);
    }
}