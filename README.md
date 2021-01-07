# Welcome to HoopsHub!
HoopsHub is a Google Chrome extension that fetches game times from an official NBA datasheet and provides streaming links for each game. Try it out [here](https://chrome.google.com/webstore/detail/hoopshub/keandpcpbgmogipnolehjejkdbhaffje)!

<img width="404" alt="hoopshubss3" src="https://user-images.githubusercontent.com/55343494/103956772-34fc9c00-5117-11eb-8f0d-507f5a98d10f.png">
<img width="404" alt="hoopshubss4" src="https://user-images.githubusercontent.com/55343494/103956790-3ded6d80-5117-11eb-960d-5c98c56f2bcc.png">

## How to use:

##### Today's Games:
The today's games section shows games that are happening on today's UTC date. Select the card of a game you're interested in watching. Click 'Stream it!' to access a streaming link for the game. Click 'Remind me!' to receive a Google Chrome notification 1 hour before the game begins.

<img width="404" alt="hoopshubss5" src="https://user-images.githubusercontent.com/55343494/103956973-a8061280-5117-11eb-9b12-9de49985989b.png">

##### Upcoming Games:
The upcoming games section shows games that are happening within the next UTC week. Select the card of a game you're interested in watching. Click 'Remind me!' to receive a Google Chrome notification 1 hour before the game begins.

<img width="404" alt="hoopshubss6" src="https://user-images.githubusercontent.com/55343494/103957185-2cf12c00-5118-11eb-8c82-aebb1e50f3d9.png">

## Technologies used:
HoopsHub is a Google Chrome extension created using vanilla **Javascript**, **HTML**, and **CSS**. The pop-up display was styled using custom **CSS** and **Bootstrap**, and designed with a basic **HTML** iframe display. The **Javascript** behind the scenes makes use of **AJAX requests** and **HTML DOM** manipulation to dynamically generate cards for each basketball game. The reminder system makes use of the **Chrome Developers API** to set alarms and provide notifications after the extension is closed.

All game data is fetched from an [Official NBA datasheet](http://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2020/league/00_full_schedule.json).

## Copyright and License:
Licensed under the [MIT License](https://github.com/rohatgiy/hoopshub/blob/master/LICENSE).
