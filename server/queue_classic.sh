#!/bin/sh
# `setuser` is part of baseimage-docker. `setuser mecached xxx...` runs the given command
cd /home/app/tobias/server
exec  bundle exec rake qc:work >>/home/app/tobias/server/log/queue_classic.log
