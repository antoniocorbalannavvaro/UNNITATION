source `dirname $0`/../env.sh

sessionId=`curl -v "$API_URL/user/login?email=andrea@hotmail.com&password=123" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo "Session ID: $sessionId"

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "name": "sad", "emojiUnicode": "A" }' $API_URL/label/create ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "name": "mad", "emojiUnicode": "B" }' $API_URL/label/create ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "name": "happy", "emojiUnicode": "C" }' $API_URL/label/create ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "name": "annoyed", "emojiUnicode": "D" }' $API_URL/label/create ; echo
