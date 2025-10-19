SET NAMES utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;	


CREATE DATABASE IF NOT EXISTS xmen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use xmen_db;

DROP TABLE IF EXISTS missao_herois;
DROP TABLE IF EXISTS missao;
DROP TABLE IF EXISTS viloes;
DROP TABLE IF EXISTS locais;
DROP TABLE IF EXISTS mutantes;

create table mutantes(
id_mutante int not null auto_increment primary key,
alter_ego varchar(50),
nome varchar(50),
sobrenome varchar(50),
link varchar(200),
imagem varchar(100),
tipo ENUM('heroi', 'vilao') NOT NULL,
contador_missoes INT NOT NULL DEFAULT 0,
pontuacao_total INT NOT NULL DEFAULT 0
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table locais(
id_local int not null auto_increment primary key,
nome_local varchar(100),
localizacao varchar(100),
link varchar(200),
imagem varchar(100)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE viloes (
id_vilao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
alter_ego VARCHAR(50),
nome VARCHAR(50),
sobrenome VARCHAR(50),
imagem VARCHAR(100)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE missao (
id_missao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_vilao INT NOT NULL,
id_local INT NOT NULL,
dificuldade INT DEFAULT 1,
FOREIGN KEY (id_vilao) REFERENCES viloes(id_vilao),
FOREIGN KEY (id_local) REFERENCES locais(id_local)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE missao_herois (
id_missao INT NOT NULL,
id_heroi INT NOT NULL,
PRIMARY KEY (id_missao, id_heroi),
FOREIGN KEY (id_missao) REFERENCES missao(id_missao),
FOREIGN KEY (id_heroi) REFERENCES mutantes(id_mutante)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO mutantes (alter_ego, nome, sobrenome, link, imagem, tipo) VALUES
('Ciclope', 'Scott', 'Summers', 'https://marvel.fandom.com/wiki/Scott_Summers_(Earth-616)', 'ciclope.png', 'heroi'),
('Fênix', 'Jean', 'Grey', 'https://marvel.fandom.com/wiki/Jean_Grey_(Earth-616)', 'jean_grey.png', 'heroi'),
('Rainha Branca', 'Emma', 'Frost', 'https://marvel.fandom.com/wiki/Emma_Frost_(Earth-616)', 'emma_frost.png', 'heroi'),
('Wolverine', 'James', 'Howlett', 'https://marvel.fandom.com/wiki/James_Howlett_(Earth-616)', 'wolverine.png', 'heroi'),
('Tempestade', 'Ororo', 'Munroe', 'https://marvel.fandom.com/wiki/Ororo_Munroe_(Earth-616)', 'tempestade.png', 'heroi'),
('Fera', 'Henry', 'McCoy', 'https://marvel.fandom.com/wiki/Henry_McCoy_(Earth-616)', 'fera.png', 'heroi'),
('Homem de Gelo', 'Robert', 'Drake', 'https://marvel.fandom.com/wiki/Robert_Drake_(Earth-616)', 'homem_de_gelo.png', 'heroi'),
('Anjo / Arcanjo', 'Warren', 'Worthington III', 'https://marvel.fandom.com/wiki/Warren_Worthington_III_(Earth-616)', 'anjo.png', 'heroi'),
('Vampira', 'Anna', 'Marie', 'https://marvel.fandom.com/wiki/Anna_Marie_LeBeau_(Earth-616)', 'vampira.png', 'heroi'),
('Gambit', 'Remy', 'LeBeau', 'https://marvel.fandom.com/wiki/Remy_LeBeau_(Earth-616)', 'gambit.png', 'heroi'),
('Noturno', 'Kurt', 'Wagner', 'https://marvel.fandom.com/wiki/Kurt_Wagner_(Earth-616)', 'noturno.png', 'heroi'),
('Jubileu', 'Jubilation', 'Lee', 'https://marvel.fandom.com/wiki/Jubilation_Lee_(Earth-616)', 'jubileu.png', 'heroi'),
('Colossus', 'Piotr', 'Rasputin', 'https://marvel.fandom.com/wiki/Piotr_Rasputin_(Earth-616)', 'colossus.png', 'heroi'),
('Lince Negra', 'Katherine "Kitty"', 'Pryde', 'https://marvel.fandom.com/wiki/Katherine_Pryde_(Earth-616)', 'lince_negra.png', 'heroi'),
('Capitã Britânia', 'Elizabeth', 'Braddock', 'https://marvel.fandom.com/wiki/Elizabeth_Braddock_(Earth-616)', 'capita_britania.png', 'heroi'),
('Psylocke', 'Kwannon', '', 'https://marvel.fandom.com/wiki/Kwannon_(Earth-616)', 'psylocke.png', 'heroi'),
('Professor X', 'Charles', 'Xavier', 'https://marvel.fandom.com/wiki/Charles_Xavier_(Earth-616)', 'professor_x.png', 'heroi'),
('Magneto', 'Max', 'Eisenhardt', 'https://marvel.fandom.com/wiki/Max_Eisenhardt_(Earth-616)', 'magneto.png', 'vilao'),
('Moira X', 'Moira', 'MacTaggert', 'https://marvel.fandom.com/wiki/Moira_MacTaggert_(Earth-616)', 'moira.png', 'vilao'),
('Mística', 'Raven', 'Darkhölme', 'https://marvel.fandom.com/wiki/Raven_Darkhölme_(Earth-616)', 'mistica.png', 'vilao'),
('Apocalipse', 'En', 'Sabah Nur', 'https://marvel.fandom.com/wiki/En_Sabah_Nur_(Earth-616)', 'apocalipse.png', 'vilao'),
('Senhor Sinistro', 'Nathaniel', 'Essex', 'https://marvel.fandom.com/wiki/Nathaniel_Essex_(Mister_Sinister)_(Earth-616)','senhor_sinistro.png', 'vilao'),
('Rainha Negra', 'Selene', 'Gallio', 'https://marvel.fandom.com/wiki/Selene_Gallio_(Earth-616)', 'selene.png', 'vilao'),
('Ômega Red', 'Arkady', 'Rossovich', 'https://marvel.fandom.com/wiki/Arkady_Rossovich_(Earth-616)', 'omega_red.png', 'vilao'),
('Bishop', 'Lucas', 'Bishop', 'https://marvel.fandom.com/wiki/Lucas_Bishop_(Earth-1191)', 'bishop.png', 'heroi'),
('Cable', 'Nathan', 'Summers', 'https://marvel.fandom.com/wiki/Nathan_Summers_(Earth-616)', 'cable.png', 'heroi'),
('Deadpool', 'Wade', 'Wilson (Não-Mutante)', 'https://marvel.fandom.com/wiki/Wade_Wilson_(Earth-616)', 'deadpool.png', 'heroi'),
('Dominó', 'Neena', 'Thurman', 'https://marvel.fandom.com/wiki/Neena_Thurman_(Earth-616)', 'domino.png', 'heroi'),
('Askani', 'Rachel', 'Summers', 'https://marvel.fandom.com/wiki/Rachel_Summers_(Earth-811)', 'rachel_summers.png', 'heroi'),
('Hope', 'Hope', 'Summers', 'https://marvel.fandom.com/wiki/Hope_Summers_(Earth-616)', 'hope_summers.png', 'heroi'),
('X-Man', 'Nathaniel "Nate"', 'Grey', 'https://marvel.fandom.com/wiki/Nathaniel_Grey_(Earth-295)', 'nate_grey.png', 'heroi'),
('Rainha Goblin', 'Madelyne', 'Pryor', 'https://marvel.fandom.com/wiki/Madelyne_Pryor_(Earth-616)', 'madelyne_pryor.png', 'vilao'),
('Destrutor', 'Alexander "Alex"', 'Summers', 'https://marvel.fandom.com/wiki/Alexander_Summers_(Earth-616)', 'alex_summers.png', 'heroi'),
('Vulcano', 'Gabriel', 'Summers', 'https://marvel.fandom.com/wiki/Gabriel_Summers_(Earth-616)', 'gabriel_summers.png', 'vilao'),
('Adam-X', 'Adam', 'Neramani', 'https://marvel.fandom.com/wiki/Adam_Neramani_(Earth-616)', 'adam_neramani.png', 'heroi'),
('Polaris', 'Lorna', 'Dane', 'https://marvel.fandom.com/wiki/Lorna_Dane_(Earth-616)', 'polaris.png', 'heroi'),
('Feiticeira Escarlate', 'Wanda', 'Maximoff', 'https://marvel.fandom.com/wiki/Wanda_Maximoff_(Earth-616)', 'feticeira_escarlate.png', 'heroi'),
('Mercúrio', 'Pietro', 'Maximoff', 'https://marvel.fandom.com/wiki/Pietro_Maximoff_(Earth-616)', 'mercurio.png', 'heroi'),
('Groxo', 'Mortimer', 'Toynbee', 'https://marvel.fandom.com/wiki/Mortimer_Toynbee_(Earth-616)', 'groxo.png', 'vilao'),
('Fanático', 'Cain', 'Marko (Não-Mutante)', 'https://marvel.fandom.com/wiki/Cain_Marko_(Earth-616)', 'fanatico.png', 'heroi'),
('Avalanche', 'Dominikos', 'Petrakis', 'https://marvel.fandom.com/wiki/Dominikos_Petrakis_(Earth-616)', 'avalanche.png', 'vilao'),
('Pyro', 'St. John', 'Allerdyce', 'https://marvel.fandom.com/wiki/St._John_Allerdyce_(Earth-616)', 'pyro.png', 'vilao'),
('Blob', 'Frederick', 'Dukes', 'https://marvel.fandom.com/wiki/Frederick_Dukes_(Earth-616)', 'blob.png', 'vilao'),
('Exodus', 'Bennet', 'du Paris', 'https://marvel.fandom.com/wiki/Bennet_du_Paris_(Earth-616)', 'exodus.png', 'vilao'),
('Dentes de Sabre', 'Victor', 'Creed', 'https://marvel.fandom.com/wiki/Victor_Creed_(Earth-616)', 'dentes_de_sabre.png', 'vilao'),
('X-23', 'Laura', 'Kinney', 'https://marvel.fandom.com/wiki/Laura_Kinney_(Earth-616)', 'x-23.png', 'heroi'),
('Texugo-do-mel ', 'Gabrielle "Gabby"', 'Kinney', 'https://marvel.fandom.com/wiki/Gabrielle_Kinney_(Earth-616)', 'gabby_kinney.png', 'heroi'),
('Daken', 'Akihiro', '', 'https://marvel.fandom.com/wiki/Akihiro_(Earth-616)', 'daken.png', 'heroi'),
('Magik', 'Illyana', 'Rasputina', 'https://marvel.fandom.com/wiki/Illyana_Rasputina_(Earth-616)', 'magik.png', 'heroi'),
('Miragem', 'Danielle', 'Moonstar', 'https://marvel.fandom.com/wiki/Danielle_Moonstar_(Earth-616)', 'miragem.png', 'heroi'),
('Mancha Solar', 'Roberto', 'Da Costa', 'https://marvel.fandom.com/wiki/Roberto_Da_Costa_(Earth-616)', 'mancha_solar.png', 'heroi'),
('Magma', 'Amara', 'Aquilla', 'https://marvel.fandom.com/wiki/Amara_Aquilla_(Earth-616)', 'magma.png', 'heroi'),
('Míssil', 'Samuel "Sam"', 'Guthrie', 'https://marvel.fandom.com/wiki/Missile_(Earth-616)', 'missil.png', 'heroi'),
('Dinamite', 'Tabitha', 'Smith', 'https://marvel.fandom.com/wiki/Tabitha_Smith_(Earth-616)', 'dinamite.png', 'heroi'),
('Lupina', 'Rahne', 'Sinclair', 'https://marvel.fandom.com/wiki/Rahne_Sinclair_(Earth-616)', 'lupina.png', 'heroi'),
('Karma', 'Xuân', 'Cao Mạnh', 'https://marvel.fandom.com/wiki/Xuân_Cao_Mạnh_(Earth-616)', 'karma.png', 'heroi'),
('Cifra', 'Douglas', 'Ramsey', 'https://marvel.fandom.com/wiki/Douglas_Ramsey_(Earth-616)', 'cifra.png', 'heroi'),
('Warlock', 'Warlock', '', 'https://marvel.fandom.com/wiki/Warlock_(Earth-616)', 'warlock.png', 'heroi'),
('Kid Ômega', 'Quintavius "Quentin"', 'Quire', 'https://marvel.fandom.com/wiki/Quintavius_Quire_(Earth-616)', 'kid_omega.png', 'heroi'),
('Glob', 'Robert', 'Herman', 'https://marvel.fandom.com/wiki/Robert_Herman_(Earth-616)', 'glob.png', 'heroi'),
('Apache', 'James', 'Proudstar', 'https://marvel.fandom.com/wiki/James_Proudstar_(Earth-616)', 'apache.png', 'heroi'),
('Flama', 'Angelica', 'Jones', 'https://marvel.fandom.com/wiki/Angelica_Jones_(Earth-616)', 'flama.png', 'heroi'),
('Cristal', 'Alison', 'Blaire', 'https://marvel.fandom.com/wiki/Alison_Blaire_(Earth-616)', 'cristal.png', 'heroi'),
('Solaris', 'Shiro', 'Yoshida', 'https://marvel.fandom.com/wiki/Shiro_Yoshida_(Earth-616)', 'solaris.png', 'heroi'),
('Forge', 'Forge', '', 'https://marvel.fandom.com/wiki/Forge_(Earth-616)', 'forge.png', 'heroi'),
('Banshee', 'Sean', 'Cassidy', 'https://marvel.fandom.com/wiki/Sean_Cassidy_(Earth-616)', 'banshee.png', 'heroi'),
('Namor', 'Namor', 'McKenzie', 'https://marvel.fandom.com/wiki/Namor_McKenzie_(Earth-616)', 'namor.png', 'heroi'),
('Legião', 'David', 'Haller', 'https://marvel.fandom.com/wiki/David_Haller_(Earth-616)', 'legiao.png', 'heroi'),
('Blink', 'Clarice', 'Ferguson', 'https://marvel.fandom.com/wiki/Clarice_Ferguson_(Earth-295)', 'blink.png', 'heroi'),
('Pó', 'Sooraya', 'Qadir','https://marvel.fandom.com/wiki/Sooraya_Qadir_(Earth-616)', 'po.png', 'heroi'),
('Dobra', 'Eden', 'Fesi', 'https://marvel.fandom.com/wiki/Eden_Fesi_(Earth-616)', 'dobra.png', 'heroi'),
('Sincro', 'Everett', 'Thomas', 'https://marvel.fandom.com/wiki/Everett_Thomas_(Earth-616)', 'sincro.png', 'heroi'),
('Sina', 'Irene', 'Adler', 'https://marvel.fandom.com/wiki/Irene_Adler_(Earth-616)', 'sina.png', 'vilao'),
('Fantomex', 'Charlie', 'Cluster-7', 'https://marvel.fandom.com/wiki/Charlie_Cluster-7_(Earth-616)', 'fantomex.png', 'heroi'),
('Rasputin IV', 'Rasputin', 'IV', 'https://marvel.fandom.com/wiki/Rasputin_IV_(Moira_VII.1)', 'rasputin_iv.png', 'heroi'),
('Caçador Noturno', 'Luis', 'Filipe (OC)', '', 'luis.png', 'heroi');

INSERT INTO locais (nome_local, localizacao, link, imagem) VALUES
('Escola Xavier para Jovens Superdotados', 'Wetchester, Nova York', 'https://marvel.fandom.com/wiki/Xavier%27s_School_for_Gifted_Youngsters', 'escola_xavier.png'),
('Ilha Muir', 'Escócia', 'https://marvel.fandom.com/wiki/Muir_Island', 'ilha_muir.jpg'),
('Krakoa', 'Nação Mutante', 'https://marvel.fandom.com/wiki/Krakoa_(Earth-616)', 'krakoa.png'),
('Genosha', 'País Mutante, África', 'https://marvel.fandom.com/wiki/Genosha', 'genosha.jpg'),
('Utopia', 'Baía de São Francisco, Califórnia', 'https://marvel.fandom.com/wiki/Utopia_(X-Men_Base)', 'utopia.png'),
('Sala de Perigo', 'Mansão Xavier, Wetchester', 'https://marvel.fandom.com/wiki/Danger_Room', 'danger_room.jpg'),
('Asteroide M', 'Órbita Terrestre', 'https://marvel.fandom.com/wiki/Asteroid_M', 'asteroid_m.png'),
('Clube do Inferno', 'Manhattan, Nova York', 'https://marvel.fandom.com/wiki/Hellfire_Club_(Earth-616)', 'hellfire_club.png'),
('Ilha Selvagem', 'Antártida', 'https://marvel.fandom.com/wiki/Savage_Land', 'ilha_selvagem.png'),
('Limbo', 'Dimensão Demoníaca', 'https://marvel.fandom.com/wiki/Limbo_(Otherplace)', 'limbo.png'),
('Madripoor', 'Ilha no Sudeste Asiático', 'https://marvel.fandom.com/wiki/Madripoor', 'madripoor.png'),
('Túneis dos Morlocks', 'Manhattan, Nova York', 'https://marvel.fandom.com/wiki/Alley', 'tuneis_morlock.jpg');

INSERT INTO viloes (alter_ego, nome, sobrenome, imagem)
SELECT alter_ego, nome, sobrenome, imagem
FROM mutantes
WHERE tipo = 'vilao';

