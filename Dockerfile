# O site é estático: não há nada para compilar, nem Node em produção.
# Uma imagem de nginx com os arquivos dentro, e pronto. ~50 MB no total.
#
# Antes daqui rodava o `next start`, que segurava ~560 MB de memória para servir
# uma página que nunca muda.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY html/ /usr/share/nginx/html/

EXPOSE 80
