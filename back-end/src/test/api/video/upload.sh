source `dirname $0`/../env.sh

sessionId=`curl -v "$API_URL/user/login?email=andrea@hotmail.com&password=123" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo "Session ID: $sessionId"

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{"name": "IBM tech meeting 1", "url": "https://youtube.com/ibm-tech-meeting-1.mp4", "transcriptUrl": "https://google.com/transcript/ibm-1.txt", "salesMeeting": false, "actorsInvolved": true, "videoDate": "2015/04/11 17:32:15.501+2", "platform": "MICROSOFT_TEAMS", "language": "INDIAN"}' $API_URL/video/upload ; echo

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{"name": "Google sales meeting 1", "url": "https://youtube.com/google-sales-meeting-1.mp4", "transcriptUrl": "https://google.com/transcript/google-1.txt", "salesMeeting": true, "actorsInvolved": false, "videoDate": "2018/03/15 21:12:04.661+1", "platform": "GOOGLE_MEET", "language": "ENGLISH"}' $API_URL/video/upload ; echo

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{"name": "ARM new core presentation rehearsal", "url": "https://youtube.com/arm-rehearsal.mp4", "salesMeeting": false, "actorsInvolved": false, "videoDate": "2017/08/12 09:30:01.124+3", "platform": "ZOOM", "language": "CHINESE"}' $API_URL/video/upload ; echo

sessionId=`curl -v "$API_URL/user/login?email=ana@gmail.es&password=1234" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo "Session ID: $sessionId"

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{"name": "IBM tech meeting 2", "url": "https://youtube.com/ibm-tech-meeting-2.mp4", "transcriptUrl": "https://google.com/transcript/ibm-2.txt", "salesMeeting": false, "actorsInvolved": true, "videoDate": "2015/05/10 15:30:00.031+1", "platform": "ZOOM", "language": "SPANISH"}' $API_URL/video/upload ; echo

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{"name": "Google sales meeting 2", "url": "https://youtube.com/google-sales-meeting-2.mp4", "salesMeeting": true, "actorsInvolved": true, "videoDate": "2018/04/22 20:00:00.500+1", "platform": "MICROSOFT_TEAMS", "language": "ENGLISH"}' $API_URL/video/upload ; echo

