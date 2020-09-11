
--
-- Base de datos: `BD_AGENDA`
--

-- --------------------------------------------------------

CREATE DATABASE BD_AGENDA;

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `fecha_inicio` varchar(20) NOT NULL,
  `fecha_fin` varchar(20) DEFAULT NULL,
  `hora_inicio` varchar(20) DEFAULT NULL,
  `hora_fin` varchar(20) DEFAULT NULL,
  `allday` tinyint(1) DEFAULT NULL,
  `fk_usuarios` varchar(50) NOT NULL
) ;


CREATE TABLE `usuarios` (
  `email` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL
);


INSERT INTO `usuarios` (`email`, `nombre`, `password`, `fecha_nacimiento`) VALUES
('edvillamil@gmail.com', 'Edward', '$2y$10$W8FD0TxTSe7SI9PcYjX/kOGacZDWI/2vog.D6G/jjNmY/Ss7ZYH9.', '2000-11-01'),
('alexander@gmail.com', 'Alexander', '$2y$10$Ha7A76KRykNP1GEK5AEjh.iOWdaj4YOJNn5KkxIG/pfL.MbrkIUH2', '1999-07-15'),
('villamil@gmail.com', 'Villamil', '$2y$10$CKtvyp6EMBZHMnbA4bgLpOFnXOn./QLqHDsHQhiDJv2QP4kjy..rK', '2008-12-03');


ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuarios` (`fk_usuarios`);


ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `eventos`
  ADD CONSTRAINT `fk_usuarioemail_evento` FOREIGN KEY (`fk_usuarios`) REFERENCES `usuarios` (`email`);
COMMIT;
