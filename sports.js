const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function fetchData()
{
    var req = new XMLHttpRequest;
    req.open("GET", "http://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2019/league/00_full_schedule.json", true);

    req.onload = function()
    {
        if (req.status != 200)
        {
            console.log("error");
        }
        else
        {
            data = JSON.parse(req.responseText)
            //console.log(JSON.parse(JSON.stringify(req.responseText)));
            displayGame(data);
        }
    };

    req.onerror = function()
    {

    };

    req.send();
}

function displayGame(data)
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    console.log(data.lscd[7].mscd.g[0].gdte);
}

fetchData();