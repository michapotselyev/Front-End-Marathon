function monthDays(year, month)
{
    return (month == 2 ? ((year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)) ? 28 : 29) : (((month < 8 && (month & 1) == 0) || (month > 7 && (month & 1) == 1)) ? 31 : 30));
}

function calculateTime()
{
    let Date1 = new Date();
    let Date2 = new Date('01.01.1939');
    var y1 = Date2.getUTCFullYear();
    var m1 = Date2.getUTCMonth();
    var d1 = Date2.getUTCDate();
    var d2 = Date1.getUTCDate();
    var years = Date1.getUTCFullYear() - y1;
    var months = Date1.getUTCMonth() - m1;
    var days = d2 - d1;
    var hours = Date1.getUTCHours() - Date2.getUTCHours();
    var minutes = Date1.getUTCMinutes() - Date2.getUTCMinutes();
    var seconds = Date1.getUTCSeconds() - Date2.getUTCSeconds();
    var dd = 0;
    if (seconds < 0)
    {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0)
    {
        minutes += 60;
        hours--;
    }
    if (hours < 0)
    {
        hours += 24;
        days--;
        dd = 1;
    }
    if (days < 0)
    {
        days = monthDays(y1, m1)-d1+d2-dd;
        months--;
    }
    if (months < 0)
    {
        months += 12;
        years--;
    }
    return  {
        year: years,
        month: months,
        day: days,
        years()
        {
            return this.year;
        },
        months()
        {
            return this.month;
        },
        days()
        {
            return this.day;
        }
    };
}

module.exports.calculateTime = calculateTime;

