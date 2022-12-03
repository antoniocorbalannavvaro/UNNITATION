source `dirname $0`/../env.sh

# Get an invitation token
email="ana@gmail.es"
invitationToken=`psql $DATABASE --csv <<< "SELECT i.token FROM app_user AS au JOIN invitation AS i ON i.app_user_id = au.id WHERE au.email = '$email'" | tail -n 1`

# Access the invitation link to get the session id
sessionId=`curl -v $API_URL/invitation/$invitationToken 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`

curl --json '{ "password": "1234", "firstName": "Ana", "middleName": "Rodríguez", "lastName": "Miñarro", "birthDate": "1998/08/11 17:35:13.133+2", "gender": "NON_BINARY", "department": "SALES", "mainLanguage": "CHINESE", "secondaryLanguages": [ "INDIAN", "SPANISH" ] }' -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/user/accept ; echo

# Get an invitation token
email="pedro@yahoo.com"
invitationToken=`psql $DATABASE --csv <<< "SELECT i.token FROM app_user AS au JOIN invitation AS i ON i.app_user_id = au.id WHERE au.email = '$email'" | tail -n 1`

# Access the invitation link to get the session id
sessionId=`curl -v $API_URL/invitation/$invitationToken 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`

curl --json '{ "password": "pedro", "firstName": "Pedro", "middleName": "Simón", "lastName": "García", "birthDate": "1992/10/22 03:11:18.562+5", "gender": "MALE", "department": "SUPPORT", "mainLanguage": "ENGLISH", "secondaryLanguages": [ "SPANISH" ] }' -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/user/accept ; echo

# Get an invitation token
email="sandra@gmail.com"
invitationToken=`psql $DATABASE --csv <<< "SELECT i.token FROM app_user AS au JOIN invitation AS i ON i.app_user_id = au.id WHERE au.email = '$email'" | tail -n 1`

# Access the invitation link to get the session id
sessionId=`curl -v $API_URL/invitation/$invitationToken 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`

curl --json '{ "password": "sss", "firstName": "Sandra", "middleName": "Valera", "lastName": "Jiménez", "birthDate": "1999/01/06 08:00:11.153+1", "gender": "TRANS", "department": "CALL_CENTER", "mainLanguage": "INDIAN", "secondaryLanguages": [ "ENGLISH", "CHINESE" ] }' -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/user/accept ; echo

