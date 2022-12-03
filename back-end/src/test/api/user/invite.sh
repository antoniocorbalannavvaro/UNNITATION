source `dirname $0`/../env.sh

sessionId=`curl -v "$API_URL/user/login?email=andrea@hotmail.com&password=123" 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`
echo "Session ID: $sessionId"

curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "email": "ana@gmail.es", "roles": [ "ADMINISTRATOR" ] }' $API_URL/user/invite ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "email": "sandra@gmail.com", "roles": [ "ANNOTATOR", "DATA_SCIENTIST" ], "annotationDedicationTime": 5 }' $API_URL/user/invite ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "email": "pedro@yahoo.com", "roles": [ "ANNOTATOR" ], "annotationDedicationTime": 20 }' $API_URL/user/invite ; echo
curl -b "$SESSION_ID_COOKIE_LABEL=$sessionId" --json '{ "email": "diego@gmail.com", "roles": [ "DATA_SCIENTIST" ] }' $API_URL/user/invite ; echo
