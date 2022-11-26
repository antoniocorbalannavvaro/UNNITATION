source ../env.sh

# TODO: check the output!!
curl --json '{ "email": "andrea@hotmail.com", "roles": [ "ANNOTATOR", "ADMINISTRATOR" ], "annotationDedicationTime": 20 }' $API_URL/user/invite ; echo
curl --json '{ "email": "sandra@gmail.com", "roles": [ "DATA_SCIENTIST" ] }' $API_URL/user/invite ; echo
curl --json '{ "email": "pedro@yahoo.com", "roles": [ "ANNOTATOR" ] }' $API_URL/user/invite ; echo
