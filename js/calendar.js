
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

function requiredMonths(startDate, numberOfDays){
    // Returns all the months at will need to be rendered, starting
    // at startDate and going numberOfDays into the future.
    // returns the data as full date objects, with the day of 
    // the month equal to 1, for convenience later.

    var months = [];

    var firstMonth = new Date(startDate);
    firstMonth.setDate(1);

    months.push(firstMonth);

    for (var i = 0; i < numberOfDays; i++){
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

function renderCalendar(month, startDate){
    var html = "";

    html += "<p>" + monthNames[month.getMonth()] + " " +  month.getFullYear() + "<p>";

    document.getElementById("generatedCalendars").innerHTML += html;
}

function generateCalendars(){
    var startDate = document.getElementById("startDate").value;
    var numberOfDays = document.getElementById("numberOfDays").value;
    var countryCode = document.getElementById("countryCode").value;

    // sanitizing input, a little bit

    startDate = new Date(startDate);
    numberOfDays = parseInt(numberOfDays, 10);
    countryCode = countryCode.trim().toUpperCase();

    var months = requiredMonths(startDate, numberOfDays);

    document.getElementById("generatedCalendars").innerHTML = "";
    for (var i = 0; i < months.length; i++){
        renderCalendar(months[i], startDate);
    }
}