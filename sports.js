const fetch = require("node-fetch");

function fetchData()
{
    fetch("http://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2019/league/00_full_schedule.json").then(function(data) {
        displayGame(data);
    })
    .catch(function(data)
    {

    });

}

function displayGame(data)
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    if (data.mscd.mon.g.gdte.equals('2020-07-30'))
    {
        console.log(data.mscd.mon.h.ta + ' vs. ' + data.mscd.mon.v.ta);
    }
}

fetchData();
displayGame(data);