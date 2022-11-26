source ../env.sh

# Get an invitation token
email="andrea@hotmail.com"
invitationToken=`psql $DATABASE --csv <<< "SELECT i.token FROM app_user AS au JOIN invitation AS i ON i.app_user_id = au.id WHERE au.email = '$email'" | tail -n 1`

# Access the invitation link to get the session id
sessionId=`curl -v $API_URL/invitation/$invitationToken 2>&1 | grep "$SESSION_ID_COOKIE_LABEL=" | cut -f 2- -d = | cut -f 1 -d ";"`

curl --json '{ "password": "123", "firstName": "Andrea", "middleName": "Sánchez", "lastName": "Pérez", "birthDate": "1993/12/22 17:35:13.133+2", "gender": "FEMALE", "department": "SALES", "mainLanguage": "SPANISH", "secondaryLanguages": [ "ENGLISH", "CHINESE" ] }' -b "$SESSION_ID_COOKIE_LABEL=$sessionId" $API_URL/user/accept ; echo
