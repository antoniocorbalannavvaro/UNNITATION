source `dirname $0`/../env.sh

sessionId=`curl -v "$API_URL/user/login?email=ana@gmail.es&password=1234" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/user/info 2> /dev/null | json_reformat
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/user/info?userId=4 2> /dev/null | json_reformat

