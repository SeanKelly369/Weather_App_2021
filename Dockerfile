FROM uduntu
RUN mkdir /weather-app
RUN groupadd -r damienhurst && useradd -r -s /bin/false -g damienhurst damienhurst
WORKDIR /weather-app
COPY . /weather-app
RUN chown -R damienhurst:damienhurst /weather-app
USER damienhurst
CMD tail -f /dev/null

FROM node:15.7.0-buster as builder

WORKDIR /usr/src/app

COPY ../package.json ../package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --aot --prod -env=prod

FROM nginx:1.19.6
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist/weather-app /usr/share/nginx/html