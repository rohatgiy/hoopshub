document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').onload = fetchData;
    
    if (location.pathname.split('/').slice(-1)[0] === 'next.html')
    {
        document.querySelector('#next-page').addEventListener('click', showOtherPage('upcoming'));
    }
    else if (location.pathname.split('/').slice(-1)[0] === 'upcoming.html')
    {
        document.querySelector('#previous-page').addEventListener('click', showOtherPage('next'));
    } 
});

function showOtherPage(filename)
{
    return () =>
    {
        parent.document.querySelector('iframe').src= './' + filename + '.html';
    }
}

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
            data = JSON.parse(req.responseText);
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

    document.querySelector('#update').innerHTML = 'Last updated: ' + year + '-0' + (month+1) + '-' + day + ' @ ' + (hours) + ':' + minsString + ' UTC';

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

        if (gameDate.getUTCDate()-today.getUTCDate() < 0)
        {
            continue;
        }
        else if (gameDate.getUTCDate()-today.getUTCDate() <= 7 && gameDate.getUTCDate()-today.getUTCDate() >= 0)
        {
            var div = document.createElement('div');
            div.innerHTML = '<b>'+ data.lscd[index].mscd.g[i].h.tc + ' ' +  data.lscd[index].mscd.g[i].h.tn + ' (' + data.lscd[index].mscd.g[i].h.ta +') <br>vs. <br>' 
            + data.lscd[index].mscd.g[i].v.tc + ' ' +  data.lscd[index].mscd.g[i].v.tn + ' (' + data.lscd[index].mscd.g[i].v.ta +') </b>'
            +'<br>' + data.lscd[index].mscd.g[i].gdtutc + ' @ ' + data.lscd[index].mscd.g[i].utctm + ' UTC';

            var subDiv = document.createElement('div');
            
            var remind = document.createElement('a');
            remind.className = 'remind';
            remind.id = 'remind-'+i+'';
            remind.innerHTML = 'Remind me!';

            var stream = document.createElement('a');
            stream.className = 'stream';
            stream.innerHTML = 'Stream it!';
            stream.target = '_blank';
            stream.href = 'https://nba-streams.xyz/schedule/';

            // Uncomment this code on the 22nd of July to check if it works

            // if (data.lscd[index].mscd.g[i].h.tc === 'LA')
            // {
            //     var temp = 'Los Angeles';
            // }
            // else
            // {
            //     var temp = data.lscd[index].mscd.g[i].h.tc;
            // }
            // var streamLink = temp + ' ' + data.lscd[index].mscd.g[i].h.tn + ' live stream';
            // streamLink = streamLink.split(' ').join('-').toLowerCase(); 
            // stream.href = 'https://nba-streams.xyz/stream/' + streamLink;

            subDiv.append(stream);
            subDiv.append(remind);
            
            if (location.pathname.split('/').slice(-1)[0] === 'upcoming.html')
            {
                stream.style.visibility = 'hidden';
            }
            div.append(subDiv);

            if (today-gameDate > 0)
            {

            }
            else
            {
                if (location.pathname.split('/').slice(-1)[0] === 'next.html' && gameDate.getDate() === today.getDate())
                {
                    document.querySelector('#next').appendChild(div);
                    first = false;
                }
                else if (location.pathname.split('/').slice(-1)[0] === 'upcoming.html' && gameDate.getDate() != today.getDate())
                {
                    document.querySelector('#games').appendChild(div);
                }
            }
        }
        else
        {
            if (i === 0)
            {
                if (location.pathname.split('/').slice(-1)[0] === 'next.html')
                {
                    document.querySelector('#next').append('No games today.');
                }
                else if (location.pathname.split('/').slice(-1)[0] === 'upcoming.html')
                {
                    document.querySelector('#games').append('No upcoming games.');
                }
            }
            break;
        }
    }

    if (location.pathname.split('/').slice(-1)[0] === 'upcoming.html')
    {
        for(var j = 0; j < document.querySelector('#games').childElementCount; j++)
        {
            document.querySelector('#games').childNodes[j].style.height= '220px';
        }
    }

    if (location.pathname.split('/').slice(-1)[0] === 'next.html')
    {
        var string = 'next';
    }
    else if (location.pathname.split('/').slice(-1)[0] === 'upcoming.html')
    {
        var string = 'games';
    }

    for (var k = parseInt(document.querySelector('#'+string).firstChild.childNodes[3].lastChild.id.substring(7)); k < document.getElementById(string).childElementCount; k++)
    {
        var date = new Date(parseInt(data.lscd[index].mscd.g[k].gdtutc.substring(0,4)), 
        parseInt(data.lscd[index].mscd.g[k].gdtutc.substring(5,7))-1, 
        parseInt(data.lscd[index].mscd.g[k].gdtutc.substring(8)),
        parseInt(data.lscd[index].mscd.g[k].utctm.substring(0,2))-(today.getTimezoneOffset()/60),
        parseInt(data.lscd[index].mscd.g[k].utctm.substring(3)));

        var element = document.querySelector('#remind-'+k+'');
        if (element === null)
        {
            console.log(k);
        }
        element.addEventListener('click', remindGame(today, date));
    }
}

function remindGame(today, date)
{
    return () =>
    {
        alert('You will now be reminded 1 hour before the game. NOTE: Shutting down your computer will remove all reminders.');
        console.log('sent message');
        chrome.runtime.sendMessage({current: today, future: date});
    }
}