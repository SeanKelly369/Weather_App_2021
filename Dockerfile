FROM uduntu
RUN mkdir /weather-app
RUN groupadd -r damienhurst && useradd -r -s /bin/false -g damienhurst damienhurst
WORKDIR /weather-app
COPY . /weather-app
RUN chown -R damienhurst:damienhurst /weather-app
USER damienhurst
CMD tail -f /dev/null

FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build --aot --prod -env=prod

FROM nginx:latest
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/weather-app /usr/share/nginx/html

EXPOSE 80