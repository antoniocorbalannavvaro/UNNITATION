source `dirname $0`/../env.sh

sessionId=`curl -v "$API_URL/user/login?email=andrea@hotmail.com&password=123" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo "Session ID: $sessionId"

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "name": "Experiment test 3", "chunkTime": 300, "videoIds": [ 2, 3 ], "labelIds": [ 1, 2, 3 ], "userIds": [ 4 ] }' $API_URL/experiment/create ; echo
