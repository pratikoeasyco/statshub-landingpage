# O site é estático: não há nada para compilar, nem Node em produção.
# Uma imagem de nginx com os arquivos dentro, e pronto. ~50 MB no total.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY html/ /usr/share/nginx/html/

EXPOSE 80
