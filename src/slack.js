function slackChannel(webhook, message) {
  const jsonData = {
    'text' : message
  };

  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(jsonData)
  };

  UrlFetchApp.fetch(webhook, options);
}

function slackDM(token, id, text){

  const url = 'https://slack.com/api/chat.postMessage';
  const option = {
    method: 'POST',
    payload : {
      token: token,
      channel: '@' + id,
      text: text,
    },
  };

  UrlFetchApp.fetch(url, option);
}

function getSlackReactions(token, link){

  const {channel, timestamp} = getContentsFromSlackLink(link);

  const url = 'https://slack.com/api/reactions.get'
    + '?token=' + token
    + '&channel=' + channel
    + '&timestamp=' + timestamp
    + '&full=true'
  ;
  
  let res = UrlFetchApp.fetch(url, {muteHttpExceptions:true});
  return JSON.parse(res);
}

function getContentsFromSlackLink(link){
  link = link.replace(/https(.*?)archives\//, '');
  link = link.split('/');
  const channel = link[0];
  let timestamp = link[1].replace('p', '');
  const timestamp1 = timestamp.substr(0, 10);
  const timestamp2 = timestamp.substr(10);
  timestamp = timestamp1 + '.' + timestamp2;
  return {channel, timestamp};
}
