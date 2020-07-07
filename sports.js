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
    var year = today.getFullYear();
    var month = today.getMonth();
    month = 6;
    var day = today.getDate();
    var calendar = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var currentMonth = calendar[month];
    var index = -1;

    for (i = 0; i < data.lscd.length; i++)
    {
        if (data.lscd[i].mscd.mon === currentMonth)
        {
            index = i;
        }
    }

    for (i = 0; i < data.lscd[index].mscd.g.length; i++)
    {
        console.log('Home: ' + data.lscd[index].mscd.g[i].h.tc + ' ' +  data.lscd[index].mscd.g[i].h.tn + ' (' + data.lscd[index].mscd.g[i].h.ta +') '
        + '\nAway: ' + data.lscd[index].mscd.g[i].v.tc + ' ' +  data.lscd[index].mscd.g[i].v.tn + ' (' + data.lscd[index].mscd.g[i].v.ta +') '
        +'\nGame date: ' + data.lscd[index].mscd.g[i].gdte + ' @ ' + data.lscd[index].mscd.g[i].stt + '\n')
    }
}

// remember: stream link is in summer plan google doc

fetchData();