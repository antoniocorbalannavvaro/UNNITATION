source `dirname $0`/../env.sh

sessionId=`curl -v "$API_URL/user/login?email=pedro@yahoo.com&password=pedro" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo "Session ID: $sessionId"

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "instant": 20.5, "labelId": 1 }' $API_URL/annotation/add-event ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "instant": 55.0, "labelId": 3 }' $API_URL/annotation/add-event ; echo
# curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "instant": 562.55, "labelId": 4 }' $API_URL/annotation/add-event ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "instant": 1200.0, "labelId": 2 }' $API_URL/annotation/add-event ; echo

