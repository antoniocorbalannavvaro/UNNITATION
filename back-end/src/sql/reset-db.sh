#!/bin/bash

cd "`dirname $0`"
cat delete.sql database.sql session.sql database-sample-data.sql | psql unnitation

exit 0
