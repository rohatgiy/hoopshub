//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function fetchData()
{
    var req = new XMLHttpRequest;
    req.open("GET", "http://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2019/league/00_full_schedule.json", true);

    req.onload = () =>
    {
        if (req.status != 200 && req.readyState != 1)
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
    var year = today.getUTCFullYear();
    var month = today.getUTCMonth();
    var day = today.getUTCDate();
    var hours = today.getUTCHours();
    var mins = today.getUTCMinutes();   

    if (mins < 10)
    {
        var minsString = "0"+ mins;
    }
    else
    {
        minsString = mins + "";
    }

    if (hours-(today.getTimezoneOffset()/60) < 0)
    {
        hours = 12 + hours-(today.getTimezoneOffset()/60);
    }

    document.querySelector('#update').innerHTML = 'Last updated: ' + year + '-0' + (month+1) + '-' + day + ' @ ' + (hours-(today.getTimezoneOffset()/60)) + ':' + minsString + ' Local Time';

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

    var first = true; 

    for (i = 0; i < data.lscd[index].mscd.g.length; i++)
    {
        var gameDate = new Date(parseInt(data.lscd[index].mscd.g[i].gdtutc.substring(0,4)), 
        parseInt(data.lscd[index].mscd.g[i].gdtutc.substring(5,7))-1, 
        parseInt(data.lscd[index].mscd.g[i].gdtutc.substring(8)),
        parseInt(data.lscd[index].mscd.g[i].utctm.substring(0,2))-(today.getTimezoneOffset()/60),
        parseInt(data.lscd[index].mscd.g[i].utctm.substring(3)));

        if (gameDate.getUTCDate()-today.getUTCDate() <= 7 && gameDate.getUTCDate()-today.getUTCDate() >= 0)
        {
            var div = document.createElement('div');
            div.innerHTML = data.lscd[index].mscd.g[i].h.tc + ' ' +  data.lscd[index].mscd.g[i].h.tn + ' (' + data.lscd[index].mscd.g[i].h.ta +') vs. ' 
            + data.lscd[index].mscd.g[i].v.tc + ' ' +  data.lscd[index].mscd.g[i].v.tn + ' (' + data.lscd[index].mscd.g[i].v.ta +') '
            +'<br>' + data.lscd[index].mscd.g[i].gdtutc + ' @ ' + data.lscd[index].mscd.g[i].utctm + ' UTC<br>';
            var remind = document.createElement('button');
            remind.id = 'remind';
            remind.innerHTML = 'Remind me!';

            var stream = document.createElement('a');
            stream.id = 'stream';
            stream.innerHTML = 'Stream it!';
            stream.target = '_blank';
            stream.href = 'https://nba-streams.xyz/schedule/';
            
            div.append(remind);
            div.append(stream);

            

            if (today-gameDate > 0)
            {
                console.log(gameDate);
            }
            else
            {
                if (first === true)
                {
                    document.querySelector('#next').appendChild(div);
                    first = false;
                }
                else
                {
                    document.querySelector('#games').appendChild(div);
                }
            }
            // console.log('Home: ' + data.lscd[index].mscd.g[i].h.tc + ' ' +  data.lscd[index].mscd.g[i].h.tn + ' (' + data.lscd[index].mscd.g[i].h.ta +') '
            // + '\nAway: ' + data.lscd[index].mscd.g[i].v.tc + ' ' +  data.lscd[index].mscd.g[i].v.tn + ' (' + data.lscd[index].mscd.g[i].v.ta +') '
            // +'\nGame date: ' + data.lscd[index].mscd.g[i].gdte + ' @ ' + data.lscd[index].mscd.g[i].stt + '\n');
        }
        else
        {
            if (i === 0)
            {
                document.querySelector('#next').append('No games this week. :(');
                document.querySelector('#games').append(':(');
            }
            break;
        }
    }
}

function remindGame()
{
    // remind code
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').onload = fetchData;
});

//fetchData();

// remember: stream link is in summer plan google doc