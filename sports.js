//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function fetchData()
{
    var req = new XMLHttpRequest;
    req.open("GET", "http://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2019/league/00_full_schedule.json", true);

    req.onload = () =>
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
    var day = today.getDate();
    day = 15;
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
        if (Math.abs(parseInt(data.lscd[index].mscd.g[i].gdte.substring(8), 10) - day) <= 7)
        {
            var li = document.createElement('li');
            li.innerHTML = 'Home: ' + data.lscd[index].mscd.g[i].h.tc + ' ' +  data.lscd[index].mscd.g[i].h.tn + ' (' + data.lscd[index].mscd.g[i].h.ta +') '
            + '\nAway: ' + data.lscd[index].mscd.g[i].v.tc + ' ' +  data.lscd[index].mscd.g[i].v.tn + ' (' + data.lscd[index].mscd.g[i].v.ta +') '
            +'\nGame date: ' + data.lscd[index].mscd.g[i].gdte + ' @ ' + data.lscd[index].mscd.g[i].stt + '\n';

            if (i === 0)
            {
                document.querySelector('#next').appendChild(li);
            }
            else
            {
                document.querySelector('#games').appendChild(li);
            }

            // console.log('Home: ' + data.lscd[index].mscd.g[i].h.tc + ' ' +  data.lscd[index].mscd.g[i].h.tn + ' (' + data.lscd[index].mscd.g[i].h.ta +') '
            // + '\nAway: ' + data.lscd[index].mscd.g[i].v.tc + ' ' +  data.lscd[index].mscd.g[i].v.tn + ' (' + data.lscd[index].mscd.g[i].v.ta +') '
            // +'\nGame date: ' + data.lscd[index].mscd.g[i].gdte + ' @ ' + data.lscd[index].mscd.g[i].stt + '\n');
        }
        else
        {
            break;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').onload = fetchData;
});

//fetchData();

// remember: stream link is in summer plan google doc