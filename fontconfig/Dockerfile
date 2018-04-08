FROM lambci/lambda:nodejs6.10

ARG dir=/tmp

USER root

RUN yum update -y \
    && rpm --rebuilddb; yum install -y git wget gperf freetype-devel libxml2-devel libtool gettext \
    && wget https://bootstrap.pypa.io/ez_setup.py -O - | python \
    && easy_install pip \
    && pip install lxml six \
    && git clone http://anongit.freedesktop.org/git/fontconfig fontconfig-repo \
    && cd fontconfig-repo \
    && git checkout -b 2.12.4 refs/tags/2.12.4 \
    && ./autogen.sh --sysconfdir=${dir}/fontconfig/etc --prefix=${dir}/fontconfig/usr --mandir=${dir}/fontconfig/usr/share/man --enable-libxml2 \
    && make \
    && make install

COPY fonts ${dir}/fontconfig/usr/share/fonts

RUN echo "<?xml version=\"1.0\"?> \
<!DOCTYPE fontconfig SYSTEM \"fonts.dtd\"> \
<fontconfig> \
  <dir>${dir}/fontconfig/usr/share/fonts</dir> \
</fontconfig>" > ${dir}/fontconfig/etc/fonts/local.conf \
   && ${dir}/fontconfig/usr/bin/fc-cache -fs

ENTRYPOINT /bin/sh