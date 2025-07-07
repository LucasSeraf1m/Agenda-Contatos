DROP USER if exists 'admagenda'@'%' ;

CREATE USER 'admagenda'@'%' IDENTIFIED BY 'admagenda';

GRANT ALL PRIVILEGES ON * . * TO 'admagenda'@'%';