chrome.runtime.onMessage.addListener(gotMessage);
chrome.alarms.onAlarm.addListener(fireAlarm);

function gotMessage(message, sender, sendResp)
{
    console.log(message);
    var today = message.current;
    var date = message.future;
    createAlarm(today, date);
}

function createAlarm(today, date)
{
    console.log(date);
    var reminderTime = new Date(date)-3600000;

    console.log(today);
    var todayTime = new Date(today);

    var diff = reminderTime - todayTime;
    console.log(diff);

    chrome.alarms.create('game', {when: Date.now() + diff});
}

function fireAlarm()
{
    chrome.notifications.create('HoopsHub Game Reminder', {type: 'basic', 
    iconUrl: './ball.png', title: 'HoopsHub Game Reminder', 
    message: 'Game in 1 hour!', contextMessage: 'Enjoy the game!'});
}
