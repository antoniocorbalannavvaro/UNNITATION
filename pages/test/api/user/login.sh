source ../env.sh

sessionId=`curl -v "$API_URL/user/login?username=andrea@hotmail.com&password=123" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo $sessionId
