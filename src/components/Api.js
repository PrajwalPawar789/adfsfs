You can submit audio file (if file is available at you server location) via below sample js code (pls replace <YOUR ACCESS TOKEN> with valid token).


import fetch from 'node-fetch';
import fs from 'fs';
import qs from 'qs';

const accessToken = "<YOUR ACCESS TOKEN>";
const filePath = 'BusinessMeeting.mp3';
const symblaiParams = {
"name": "Use cases discovery call",
"conversationType": "sales",
"features": {
"featureList": ["insights", "callScore"]
},
"metadata": {
"salesStage": "Discovery",
"prospectName": "Wayne Enterprises"
}
}

const fetchResponse = await fetch(https://api.symbl.ai/v1/process/audio?${qs.stringify(symblaiParams)}, {
method: 'post',
body: fs.createReadStream(filePath),
headers: {
'Authorization': Bearer ${accessToken},
'Content-Type': 'audio/mp3',
}
});

const responseBody = await fetchResponse.json();

console.log(responseBody);
 
You should get conversation id and job id in response. Similar to
 

{
conversationId: '4708660055638',
jobId: '17349217-0aa9-492e-b087-d90a7809'
}
 
Now, to check the status of job,
 

import fetch from 'node-fetch';

const accessToken = "<YOUR ACCESS TOKEN>"
const conversationId = 4708660055638016

const fetchResponse = await fetch(https://api.symbl.ai/v1/conversations/${conversationId}/callscore/status, {
method: 'get',
headers: {
'Authorization': Bearer ${accessToken}
}
});
const responseBody = await fetchResponse.json();

console.log(responseBody);
 
This should provide you status of callscore job, similar to below
 
{ jobId: '17349217-0aa9-492e-b087-d90a7809', status: 'completed' }
 
Now, you should be able to fetch call-score accessing endpoint explained here, https://docs.symbl.ai/docs/call-score-get-started#get-call-score
 
Please do not hesitate to reach out if you have further questions.
 
Thank you for reaching out to Symbl Support.
Aksharesh
                                            