1.1 nginx балансировка
   * config - папка nginx
   * docker-compose.yml
 
1.2 nginx отказоустойчивость
   * добавил к нодам "max_fails=2 fail_timeout=2s;"
   * default/least_conn/ip_hash;
    
1.3. redis
   * конфигурация редиса на бэке - ru.ryu.labs.redis
   * rest - ru.ryu.labs Controller
   * docker-compose.yml
    
1.4. postgreSQL partition
   * sql файлик в папочке resources/postgreSQL
    
2.1 docker
   * Dockerfile в корне проекта
   * приложение в ru.ryu.labs - LabsApplication
    
2.2 S3
   * реализация на фронте (Vue)
   * resources/js/pages/S3.vue

2.3 computerVision
   * back ru.ryu.labs Controller api - '/vision'
   * front resources/js/pages/Vision.vue