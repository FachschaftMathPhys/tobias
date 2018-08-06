#!/bin/sh
# `setuser` is part of baseimage-docker. `setuser mecached xxx...` runs the given command
cd /home/app/tobias
exec  bundle exec rake qc:work >>/home/app/tobias/log/queue_classic.log
