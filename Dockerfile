FROM node:latest
ENV TZ=Asia/Kolkata
WORKDIR /root/inrl/
COPY package*.json ./
RUN npm install
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
COPY . .
CMD ["node", "index.js"]
