FROM archlinux/base

RUN pacman -Sy --noconfirm ttf-opensans librsvg nodejs npm git

WORKDIR /app

COPY package.json .
RUN npm install
RUN pacman -Rsn --noconfirm npm git

COPY . .

CMD ["node", "."]
