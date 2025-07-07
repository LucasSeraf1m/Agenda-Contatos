CREATE DATABASE  IF NOT EXISTS `agenda`;
USE `agenda`;

DROP TABLE IF EXISTS `contato`;

CREATE TABLE `contato` (
  `id_contato` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `telefone` varchar(25) DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `data_nascimento` DATE DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_contato`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `contato` VALUES 
	(1,'Roman Roy','+55(49)3824-7580',32,'1993-02-11','romanr@waystar.com'),
	(2,'Helena Eagan','+55(43)3789-8297',28,'1997-06-08','helenae@lumon.com'),
	(3,'Wyman Manderly','+55(84)3750-2064',78,'1947-07-02','wmanderly@whiteharbor.com'),
	(4,'Ethan Hunt','+55(61)2555-0810',42,'1983-02-12','ehunt@mimpossible.com'),
	(5,'Siobhan Roy','+55(63)3807-87950',31,'1994-02-17','shivr@waystar.com');
	
	

