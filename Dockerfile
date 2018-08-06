FROM phusion/passenger-ruby25
LABEL vendor="Fachschaft MathPhys"
MAINTAINER Henrik Reinstädtler <henrik@mathphys.stura.uni-heidelberg.de>



RUN apt-get update && apt-get install -qq -y --no-install-recommends \
build-essential  libpq-dev wget git cron libmagick++-dev nodejs npm
RUN npm cache clean -f
RUN npm install -g n
RUN n 9
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/bin/bash","-c","/sbin/my_init | tee /home/app/tobias/log/stdout.log"]
#update nodejs
ENV INSTALL_PATH /home/app/tobias/server

#Ordner erstellen und wechseln
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# server
#Gemfile kopieren
COPY server/Gemfile server/Gemfile.lock ./
#bundles installiere
RUN gem install bundler

RUN  bundler install
#und den rest kopieren
COPY server .
#setup nginx
RUN rm -f /etc/service/nginx/down
ADD server/webapp.conf /etc/nginx/sites-enabled/webapp.conf
ADD server/postgres-env.conf /etc/nginx/main.d/postgres-env.conf

#client 

RUN mkdir ../client
WORKDIR ../client
COPY client .
RUN npm install -g yarn
RUN yarn install
RUN npm run build
ADD client/client.conf /etc/nginx/sites-enabled/client.conf
# Queue classic für mails
WORKDIR $INSTALL_PATH
RUN bash gem install whenever
RUN rm -rf /home/app/tobias/tmp/pids && bundle exec whenever --update-crontab
RUN chown -R app /home/app
ADD server/queue_classic.sh /etc/service/queue_classic/run
RUN chmod 755 /etc/service/queue_classic/run
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
