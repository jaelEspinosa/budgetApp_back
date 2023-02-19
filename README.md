# Eureka backend


## Descripción

- Api para la db de eureka
- Con end-points para confirmar usuarios y recuperar contraseña
- con end-points protegidos por token para la DB







## Environment variables

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.4qa4unx.mongodb.net/<DB name>

SECRET_JWT_SEED='palabra secreta para el JWT'

```
## Environment variables Mail

```
APP_NAME= nombre de la app, para el correo

EMAIL_HOST=smtp.gmail.com
EMAIL_PASS= password de la cuenta email
EMAIL_PORT=465
EMAIL_USER= usuario email
FRONTEND_URL= url del front 

```