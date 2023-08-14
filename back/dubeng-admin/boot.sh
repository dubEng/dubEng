#!/bin/sh
exec gunicorn -b :5000 --access-logfile - -t 240 --error-logfile - main:app
