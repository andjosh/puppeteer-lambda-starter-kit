# Noto CJK Sans-serif https://www.google.com/get/noto/
# includes Chinese, Japanese and Korean
.PHONY: download-notocjk
download-notocjk:
	mkdir tmp \
	&& cd tmp \
	&& wget https://noto-website-2.storage.googleapis.com/pkgs/NotoSansCJK-Regular.ttc.zip \
	&& unzip NotoSansCJK-Regular.ttc.zip \
	&& ls \
	&& cp NotoSansCJK-Regular.ttc ../fonts \
	&& chmod a+r ../fonts/NotoSansCJK-Regular.ttc
	rm -r tmp

.PHONY: clean-fonts
clean-fonts:
	rm fonts/*
	touch fonts/.keep

.PHONY: build
build:
	docker build . --build-arg dir=${DIR} -t fontconfig
	docker run -itd --name fontconfig fontconfig 
	docker cp fontconfig:${DIR}/fontconfig .
	docker rm -f fontconfig
	tar -zcf fontconfig.tar.gz fontconfig
	rm -rf fontconfig