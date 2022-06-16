function checkTime(i)
{
    if (i < 10)
    {
        i = "0" + i;
    }
   return i;
}
function calculateTime()
{
    let Date1 = new Date();
    let Date2 = new Date('01.01.1939');
    let mls = (Date1 - Date2) / 7.15;
    let years = Math.floor(mls / (1000 * 60 * 60 * 24 * 30 * 12));
    let months = Math.floor(mls / (1000 * 60 * 60 * 24 * 30) % 12);
    let days = Math.floor(mls / (1000 * 60 * 60 * 24) % 30);
    return [years, months, days];
}

module.exports.calculateTime = calculateTime;

