export PROTOCOL=http
export APP_HOST=localhost
export APP_PORT=3000
export API_ROUTE=api
export API_URL=$PROTOCOL://$APP_HOST:$APP_PORT/$API_ROUTE
export DATABASE=unnitation
export SESSION_ID_COOKIE_LABEL="SESSION_ID"

echo "API url: $API_URL"
