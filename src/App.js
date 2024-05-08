// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [clientes, setClientes] = useState([]);

  // Função para carregar clientes do backend
  const carregarClientes = async () => {
    const response = await axios.get('https://backendseumei.onrender.com/clientes'); // Ajuste para sua porta de backend
    setClientes(response.data);
  };

  // Função para adicionar um novo cliente
  const adicionarCliente = async () => {
    const novoCliente = { nome, email, endereco };
    await axios.post('https://backendseumei.onrender.com/clientes', novoCliente);
    setNome('');
    setEmail('');
    setEndereco('');
    carregarClientes(); // Recarregar a lista de clientes
  };

  // Carregar clientes ao iniciar
  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div>
      <h1>Cadastro de Clientes</h1>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />
      <button onClick={adicionarCliente}>Adicionar Cliente</button>
      <button onClick={carregarClientes}>Recarregar Clientes</button>
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>
            {cliente.nome} - {cliente.email} - {cliente.endereco}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
