FROM nginx:1.15.0-alpine

# Configuração default do nginx removida
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]