-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25-Maio-2021 às 01:22
-- Versão do servidor: 10.4.17-MariaDB
-- versão do PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `task_app`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `lista_tarefas`
--

CREATE TABLE `lista_tarefas` (
  `cod_usuario` int(11) NOT NULL,
  `cod_lista` int(11) NOT NULL,
  `nome_lista` varchar(30) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `data_entrada` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_ultima_alteracao` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `lista_tarefas`
--

--INSERT INTO `lista_tarefas` (`cod_usuario`, `cod_lista`, `nome_lista`, `categoria`, `data_entrada`, `data_ultima_alteracao`) VALUES
--(91, 1, 'lista_1', 'faculdade', '2021-05-05 01:13:05', NULL),
--(91, 2, 'lista_teste3', 'teste_post', '2021-05-05 01:25:56', NULL),
--(91, 3, 'lista recem alterada', 'recemalterada2', '2021-05-18 03:03:01', '2021-05-18 15:20:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefa`
--

CREATE TABLE `tarefa` (
  `cod_lista` int(11) NOT NULL,
  `cod_tarefa` int(11) NOT NULL,
  `nome_tarefa` varchar(30) NOT NULL unique,
  `descricao` varchar(100) NOT NULL,
  `data_entrada` timestamp NOT NULL DEFAULT current_timestamp() ,
  `statusTarefa` tinyint(1) DEFAULT 0,
  `data_termino` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tarefa`
--

INSERT INTO `tarefa` (`cod_lista`, `cod_tarefa`, `nome_tarefa`, `descricao`, `data_entrada`, `statusTarefa`, `data_termino`) VALUES
(1, 1, 'tarefa_teste', 'tarefa teste para verificacao', '2021-05-05 01:33:37', 0, NULL),
(1, 2, 'tarefa_teste2', 'tarefa teste2', '2021-05-06 00:14:56', 0, NULL),
(1, 3, 'tarefa7', 'descricao da tarefa7', '2021-05-18 03:01:11', 0, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `cod_usuario` int(11) NOT NULL,
  `username` varchar(50) NOT NULL unique,
  `nome` varchar(50) NOT NULL unique,
  `email` varchar(80) NOT NULL unique,
  `password` varchar(50) NOT NULL,
  `data_entrada` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_ultima_alteracao` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`cod_usuario`, `username`, `nome`, `email`, `password`, `data_entrada`, `data_ultima_alteracao`) VALUES
(91, 'jorge','jorge', 'jorge@gmail.com', '12345', '2021-05-18 15:21:35', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `lista_tarefas`
--
ALTER TABLE `lista_tarefas`
  ADD PRIMARY KEY (`cod_lista`);

--
-- Índices para tabela `tarefa`
--
ALTER TABLE `tarefa`
  ADD PRIMARY KEY (`cod_tarefa`),
  ADD KEY `cod_lista` (`cod_lista`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cod_usuario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `lista_tarefas`
--
ALTER TABLE `lista_tarefas`
  MODIFY `cod_lista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tarefa`
--
ALTER TABLE `tarefa`
  MODIFY `cod_tarefa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `cod_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tarefa`
--
ALTER TABLE `tarefa`
  ADD CONSTRAINT `tarefa_ibfk_1` FOREIGN KEY (`cod_lista`) REFERENCES `lista_tarefas` (`cod_lista`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
