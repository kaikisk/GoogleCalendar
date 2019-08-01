var CLIENT_ID = '869215196237-728t4i6rfuptb5eaa53g3ddhgjsfkbgp.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDxFCZD_khIcgWglksSDqNxK4fGbmtAHXc';

var SCOPES = ["https://www.googleapis.com/auth/calendar"];

/*
function handleClientLoad(){
    gapi.client.setApiKey(API_KEY);

    window.setTimeout(checkAuth,1);
}

function checkAuth(){
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
        }, handleAuthResult);
}

function handleAuthResult(authResult){
    var authorizeButton = $('#authorize_button');
    loadCalendarAPI();
}

function handleAuthClick(event){
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
    }, handleAuthResult);
    return false;
}

function loadCalendarAPI(){
    gapi.client.load('calendar', 'v3', );
}

function createEvent(){
    var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2015-05-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': '2015-05-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
            {'method': 'popup', 'minutes': 10}
            ]
        }
    };

    var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
    });

    request.execute(function(event) {
    appendPre('Event created: ' + event.htmlLink);
    });
}
*/

// function listUpcommingEvents(){
//     var request = gapi.client.calendar.events.list({

//     })
// }

function handleClientLoad() {
    // 予めAPI Consoleで設定したAPIキーを設定
    gapi.client.setApiKey(API_KEY);

    // すでに認証済みかの確認をする。
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    // immediateをtrueで指定することで、未認証の場合、ただちにエラーが返り、
    // handleAuthResultが呼び出される。
    gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize_button');
    if (authResult && !authResult.error) {
      authorizeButton.style.visibility = 'hidden';
      makeApiCall();
    } else {
      authorizeButton.style.visibility = '';
      authorizeButton.onclick = handleAuthClick;
    }
}

function handleAuthClick(event) {
    // ここで、ポップアップ画面を表示して、OAuth認証を行う。
    gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}, handleAuthResult);
    return false;
}

function makeApiCall() {
    var restRequest = gapi.client.request({
        'path': '/calendar/v3/users/me/calendarList'
    });
    restRequest.execute(function(calendarList) {
      console.dir(calendarList);
    });
}