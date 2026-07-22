-- Evidence ficticia para la prueba "Del dato a la decisión".
-- La estructura está inspirada en movimientos de mantenimiento, pero todos los
-- nombres, códigos, fechas e importes fueron inventados.

CREATE TABLE movements (
  movement_id      INTEGER PRIMARY KEY,
  poliza_no        VARCHAR(20) NOT NULL,
  movement_date    DATE NOT NULL,
  plant            VARCHAR(80) NOT NULL,
  account_name     VARCHAR(80) NOT NULL,
  sku              VARCHAR(30) NOT NULL,
  article_name     VARCHAR(120) NOT NULL,
  equipment_name   VARCHAR(120),
  supplier_name    VARCHAR(120) NOT NULL,
  quantity         DECIMAL(12, 2) NOT NULL,
  unit_price       DECIMAL(12, 2) NOT NULL,
  amount           DECIMAL(12, 2) NOT NULL,
  is_cancellation  BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO movements VALUES
(1,  'MT-260101', '2026-01-08', 'Planta Norte',  'Refacciones',        'REF-RD-01', 'Rodamiento industrial',          'Trituradora T-01', 'Suministros Delta',    4,  1800,  7200,  FALSE),
(2,  'MT-260102', '2026-01-14', 'Planta Centro', 'Servicios externos', 'SER-AL-02', 'Alineación de banda',             'Banda B-02',       'Mantenimiento Vector', 1, 12500, 12500,  FALSE),
(3,  'MT-260103', '2026-01-20', 'Planta Sur',    'Consumibles',         'CON-LU-03', 'Lubricante de alta carga',        'Criba C-03',       'Fluidos Prisma',      20,   320,  6400,  FALSE),
(4,  'MT-260104', '2026-01-27', 'Planta Norte',  'Seguridad',           'SEG-CA-04', 'Casco industrial',                NULL,                'Protección Nova',     15,   480,  7200,  FALSE),
(5,  'MT-260201', '2026-02-06', 'Planta Norte',  'Refacciones',         'REF-RD-01', 'Rodamiento industrial',          'Trituradora T-01', 'Suministros Delta',    4,  1950,  7800,  FALSE),
(6,  'MT-260202', '2026-02-12', 'Planta Centro', 'Servicios externos', 'SER-AL-02', 'Alineación de banda',             'Banda B-02',       'Mantenimiento Vector', 1, 14200, 14200,  FALSE),
(7,  'MT-260203', '2026-02-18', 'Planta Sur',    'Consumibles',         'CON-LU-03', 'Lubricante de alta carga',        'Criba C-03',       'Fluidos Prisma',      20,   360,  7200,  FALSE),
(8,  'MT-260204', '2026-02-25', 'Planta Centro', 'Seguridad',           'SEG-GU-05', 'Guantes anticorte',               NULL,                'Protección Nova',     40,   140,  5600,  FALSE),
(9,  'MT-260301', '2026-03-05', 'Planta Norte',  'Refacciones',         'REF-RD-01', 'Rodamiento industrial',          'Trituradora T-01', 'Suministros Delta',    4,  2100,  8400,  FALSE),
(10, 'MT-260302', '2026-03-11', 'Planta Centro', 'Servicios externos', 'SER-AL-02', 'Alineación de banda',             'Banda B-02',       'Mantenimiento Vector', 1, 15800, 15800,  FALSE),
(11, 'MT-260303', '2026-03-19', 'Planta Sur',    'Consumibles',         'CON-LU-03', 'Lubricante de alta carga',        'Criba C-03',       'Fluidos Prisma',      20,   380,  7600,  FALSE),
(12, 'MT-260304', '2026-03-26', 'Planta Norte',  'Seguridad',           'SEG-AR-06', 'Arnés de seguridad',              NULL,                'Protección Nova',      4,  1700,  6800,  FALSE),
(13, 'MT-260401', '2026-04-07', 'Planta Norte',  'Refacciones',         'REF-RD-01', 'Rodamiento industrial',          'Trituradora T-01', 'Suministros Delta',    4,  2450,  9800,  FALSE),
(14, 'MT-260402', '2026-04-13', 'Planta Centro', 'Servicios externos', 'SER-MO-07', 'Servicio preventivo de motor',    'Banda B-02',       'Mantenimiento Vector', 1, 18000, 18000,  FALSE),
(15, 'MT-260403', '2026-04-21', 'Planta Sur',    'Consumibles',         'CON-LU-03', 'Lubricante de alta carga',        'Criba C-03',       'Fluidos Prisma',      20,   410,  8200,  FALSE),
(16, 'MT-260404', '2026-04-28', 'Planta Centro', 'Seguridad',           'SEG-CA-04', 'Casco industrial',                NULL,                'Protección Nova',     15,   480,  7200,  FALSE),
(17, 'MT-260501', '2026-05-06', 'Planta Norte',  'Refacciones',         'REF-RD-01', 'Rodamiento industrial',          'Trituradora T-01', 'Suministros Delta',    4,  2900, 11600,  FALSE),
(18, 'MT-260502', '2026-05-12', 'Planta Centro', 'Servicios externos', 'SER-MO-07', 'Servicio preventivo de motor',    'Banda B-02',       'Mantenimiento Vector', 1, 24500, 24500,  FALSE),
(19, 'MT-260503', '2026-05-20', 'Planta Sur',    'Consumibles',         'CON-LU-03', 'Lubricante de alta carga',        'Criba C-03',       'Fluidos Prisma',      20,   450,  9000,  FALSE),
(20, 'MT-260504', '2026-05-27', 'Planta Norte',  'Seguridad',           'SEG-GU-05', 'Guantes anticorte',               NULL,                'Protección Nova',     40,   190,  7600,  FALSE),
(21, 'MT-260601', '2026-06-04', 'Planta Norte',  'Refacciones',         'REF-RD-01', 'Rodamiento industrial',          'Trituradora T-01', 'Suministros Delta',    4,  3300, 13200,  FALSE),
(22, 'MT-260602', '2026-06-10', 'Planta Centro', 'Servicios externos', 'SER-MO-08', 'Reparación mayor de motor',       'Banda B-02',       'Mantenimiento Vector', 1, 42000, 42000,  FALSE),
(23, 'MT-260603', '2026-06-17', 'Planta Sur',    'Consumibles',         'CON-LU-03', 'Lubricante de alta carga',        'Criba C-03',       'Fluidos Prisma',      20,   480,  9600,  FALSE),
(24, 'MT-260604', '2026-06-23', 'Planta Centro', 'Seguridad',           'SEG-AR-06', 'Arnés de seguridad',              NULL,                'Protección Nova',      4,  2050,  8200,  FALSE),
(25, 'CN-260605', '2026-06-26', 'Planta Centro', 'Servicios externos', 'SER-MO-07', 'Cancelación servicio preventivo', 'Banda B-02',       'Mantenimiento Vector',-1, 18000,-18000,  TRUE);
