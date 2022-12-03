source `dirname $0`/../env.sh

sessionId=`curl -v "$API_URL/user/login?email=pedro@yahoo.com&password=pedro" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo "Session ID: $sessionId"

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/annotation/end ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/annotation/end ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/annotation/end ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/annotation/end ; echo
