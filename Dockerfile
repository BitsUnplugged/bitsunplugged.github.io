
# Setup and build the client

FROM node:20 as client

WORKDIR /app/frontend/
COPY frontend/package*.json .
RUN npm install --force --only=production
COPY frontend/ .

RUN npm run build   

# Setup the server

FROM node:20

RUN apt-get update
WORKDIR /app/
COPY --from=client /app/frontend/build/ ./frontend/build/

WORKDIR /app/backend/
COPY backend/package*.json .
RUN npm install
COPY backend/ . 

# Setup Database

ARG MODE

RUN if [ "$MODE" = "dev" ] ; then \
    apt-get update && apt-get install -y postgresql && apt-get clean && \
    su postgres -c "/etc/init.d/postgresql start && psql -c \"ALTER USER postgres WITH PASSWORD 'root';\" && npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all" ; \
    fi

CMD if [ "$MODE" = "dev" ] ; then /etc/init.d/postgresql start && npm start ; else npm start ; fi