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
ENV INSTALL_PATH /home/app/tobias

#Ordner erstellen und wechseln
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

#Gemfile kopieren
COPY Gemfile Gemfile.lock ./
#bundles installieren
RUN gem install bundler
RUN  bundler install
#und den rest kopieren
COPY . .
RUN rm -f /etc/service/nginx/down
ADD webapp.conf /etc/nginx/sites-enabled/webapp.conf
ADD postgres-env.conf /etc/nginx/main.d/postgres-env.conf
# Queue classic für mails
RUN bash gem install whenever
RUN rm -rf tobias/tmp/pids && bundle exec whenever --update-crontab
RUN npm install -g yarn
RUN chown -R app /home/app
ADD queue_classic.sh /etc/service/queue_classic/run
RUN chmod 755 /etc/service/queue_classic/run
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
