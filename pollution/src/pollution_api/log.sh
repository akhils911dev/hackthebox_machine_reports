#!/bin/bash

if [ $1 == 'log_message' ]
then

    date=$(date '+%d-%m-%Y-%H:%M:%S');
    echo "New registered message for admins! $date" > /home/victor/pollution_api/logs/messages/log-$date.log

elif [ $1 == 'log_register' ]
then

    date=$(date '+%d-%m-%Y-%H:%M:%S');
    echo "New registered user! $date" > /home/victor/pollution_api/logs/register/log-$date.log

elif [ $1 == 'log_login' ]
then

    date=$(date '+%d-%m-%Y-%H:%M:%S');
    echo "New authenticated user! $date" > /home/victor/pollution_api/logs/login/log-$date.log

else
  
    echo "argument invalid"

fi
