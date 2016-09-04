(function () {

    function getMonthNumber(monthName) {
        var d = new Date();
        var month = new Array();
        month["January"] = 0;
        month["February"] = 1;
        month["March"] = 2;
        month["April"] = 3;
        month["May"] = 4;
        month["June"] = 5;
        month["July"] = 6;
        month["August"] = 7;
        month["September"] = 8;
        month["October"] = 9;
        month["November"] = 10;
        month["December"] = 11;

        return month[monthName];
    }

    function getSuffixForDay(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return "st";
        }
        if (j == 2 && k != 12) {
            return "nd";
        }
        if (j == 3 && k != 13) {
            return "rd";
        }
        return "th";
    }

    function populateWeekDays(parties) {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        for (var i = 0; i < parties.length; i++) {
            console.log(parties[i]);
            var month = getMonthNumber(parties[i].month);
            for (var j = 0; j < parties[i].rows.length; j++) {
                days = parties[i].rows[j].days;
                for (var k = 0; k < days.length; k++) {
                    var d = new Date(parties[i].year, month, days[k].day);
                    days[k].weekDay = weekday[d.getDay()];
                    days[k].daySuffix = getSuffixForDay(days[k].day);
                }
            }
        }
    }

    function removePastDays(parties) {
        var newParties = [];
        for (var i = 0; i < parties.length; i++) {
            newParties.push({});
            newParties[i].month = parties[i].month;
            newParties[i].year = parties[i].year;
            newParties[i].rows = [];
            var month = getMonthNumber(parties[i].month);            
            
            for (var j = 0; j < parties[i].rows.length; j++) {
                newParties[i].rows.push({});
                newParties[i].rows[j].days = [];
                days = parties[i].rows[j].days;
                
                for (var k = 0; k < days.length; k++) {
                    var d = new Date(parties[i].year, month, days[k].day);
                    if (d > new Date()) {
                        newParties[i].rows[j].days.push({
                            day: days[k].day,
                            message: days[k].message,
                            dances: days[k].dances,
                            class: days[k].class
                        })
                    }
                }
            }
        }

        return newParties;
    }

    // partySchedule.thursdayParties = removePastDays(partySchedule.thursdayParties);
    populateWeekDays(partySchedule.thursdayParties);
    var template = $('#template').html();
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template, { parties: partySchedule.thursdayParties });
    $('#mainTemplate').html(rendered);
})();