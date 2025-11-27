create database MuseusMG;
use MuseusMG;

INSERT INTO admin (email, senha, nome, role) 
VALUES (
    'admin@museumarvels.com', 
    '$2a$04$VvtQpWDYN863OlF0UxEsv.x8f3dFYpAoU0jsfBdSFrVrmzn62ogGa', 
    'Administrador Principal', 
    'ROLE_ADMIN'
);

insert into museus()
VALUES (2, 2, "aoi", "teste", "Luiz Inacio da Silva", "08:00", "12:00", "Ahmm?", "67", "Arroz");

select * from museus;