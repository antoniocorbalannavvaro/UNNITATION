source `dirname $0`/../env.sh

sessionId=`curl -v "$API_URL/user/login?email=andrea@hotmail.com&password=123" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo "Session ID: $sessionId"

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "name": "Experiment test 1", "chunkTime": 600, "videoIds": [ 1, 2, 4 ], "labelIds": [ 1, 3 ], "userIds": [ 4 ] }' $API_URL/experiment/create ; echo

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "name": "Experiment test 2", "chunkTime": 300, "videoIds": [ 2, 3 ], "labelIds": [ 2, 4 ], "userIds": [ 3 ] }' $API_URL/experiment/create ; echo

