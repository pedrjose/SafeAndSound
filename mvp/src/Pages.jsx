import "./Pages.css";
import { Navbar } from "./Components.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Components.css";
import logo from "./assets/logo.png";

import axios from "axios";

import { useForm } from "react-hook-form";

const blockchainUrl = "http://localhost:3000";

export function HomePage() {
  const navigate = useNavigate();
  const { publicAddress } = useParams();
  const [walletData, setWalletData] = useState();

  const find = async (publicAddress) => {
    try {
      const response = await axios.post(
        `${blockchainUrl}/wallet/history`,
        { publicAddress },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setWalletData(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Erro desconhecido.");
    }
  };

  useEffect(() => {
    find(publicAddress);
  }, []);
  return (
    <>
      <Navbar />
      <section className="page-settings">
        <div className="wallet-balance">
          <h1>
            {walletData ? walletData.wallet.balance : null}.00{" "}
            <b>
              SND<i>s</i>
            </b>
          </h1>
          <h6>{walletData ? walletData.wallet.publicAddress : null}</h6>
        </div>
        <button className="button" onClick={() => navigate("/gerar-bloco")}>
          Criar um bloco
        </button>
        <button className="button" onClick={() => navigate("/minerar-bloco")}>
          Minerar
        </button>
        <button className="button" onClick={() => navigate("/buscar-carteira")}>
          Visão geral da carteira
        </button>
        <button className="button">Acessar blockchain</button>
        <img className="logo-settings" src={logo} />
      </section>
    </>
  );
}

export function GenerateWalletPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();

  const createWallet = async (privateKey) => {
    try {
      const response = await axios.post(
        `${blockchainUrl}/wallet/generate-wallet`,
        { privateKey },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);
      alert(`${response.data.details.publicAddressMessage}`);
      alert(response.data.details.securityPhrase);
      alert(response.data.details.balance);

      navigate(`/menu/${response.data.details.publicKey}`);
    } catch (error) {
      alert(
        error.response?.data?.message || "Ocorreu um erro ao gerar a carteira."
      );
    }
  };

  const submitFormData = async () => {
    const { privateKey } = getValues();

    if (!privateKey) {
      alert("Por favor, insira uma chave privada.");
      return;
    }

    await createWallet(privateKey);
  };

  return (
    <>
      <section className="page-settings">
        <Navbar />

        <h1>Crie uma carteira</h1>
        <form className="create-wallet" onSubmit={handleSubmit(submitFormData)}>
          <input
            {...register("privateKey")}
            className="form"
            type="text"
            placeholder="Chave Privada (Ex.: Harry12345)"
          />
          <input className="button" type="submit" />
        </form>
      </section>
    </>
  );
}

export function GenerateBlockPage() {
  const { register, handleSubmit, getValues } = useForm();

  const createBlock = async (
    title,
    author,
    description,
    publicAddress,
    privateKey
  ) => {
    try {
      const response = await axios.post(
        `${blockchainUrl}/block/create-block`,
        { title, author, description, publicAddress, privateKey },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message || "Ocorreu um erro ao criar bloco.");
    }
  };

  const submitFormData = async () => {
    const { title } = getValues();
    const { author } = getValues();
    const { description } = getValues();
    const { publicAddress } = getValues();
    const { privateKey } = getValues();

    if (!title || !author || !description || !publicAddress || !privateKey) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    await createBlock(title, author, description, publicAddress, privateKey);
  };

  return (
    <>
      <Navbar />
      <section className="page-settings">
        <img className="logo-settings" src={logo} />
        <form className="create-wallet" onSubmit={handleSubmit(submitFormData)}>
          <input
            {...register("title")}
            className="form"
            type="text"
            placeholder="Título da obra (Ex.: Monalisa)"
          />
          <input
            {...register("author")}
            className="form"
            type="text"
            placeholder="Autor da obra (Ex.: DaVinci)"
          />
          <input
            {...register("description")}
            className="form"
            type="text"
            placeholder="Descrição (Ex.: A pintura retrata...)"
          />
          <input
            {...register("publicAddress")}
            className="form"
            type="text"
            placeholder="Chave Pública (Ex.: 96ad982544749554b2f5f5097e)"
          />
          <input
            {...register("privateKey")}
            className="form"
            type="text"
            placeholder="Chave Privada (Ex.: Harry12345)"
          />
          <input className="button" type="submit" />
        </form>
      </section>
    </>
  );
}

export function MineBlockPage() {
  const { register, handleSubmit, getValues } = useForm();

  const mineBlock = async (minerWallet) => {
    try {
      const response = await axios.patch(
        `${blockchainUrl}/mine/validate-block`,
        { minerWallet },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);
      return response.data;
    } catch (error) {
      alert(
        error.response?.data?.message || "Ocorreu um erro ao minerar bloco."
      );
    }
  };

  const submitFormData = async () => {
    const { publicKey } = getValues();

    if (!publicKey) {
      alert("Por favor, insira sua chave pública para remuneração.");
      return;
    }

    await mineBlock(publicKey);
  };

  return (
    <>
      <section className="page-settings">
        <Navbar />
        <img className="logo-settings" src={logo} />
        <form className="create-wallet" onSubmit={handleSubmit(submitFormData)}>
          <input
            {...register("publicKey")}
            className="form"
            type="text"
            placeholder="Chave Pública (Ex.: a6716bb85be6dfaf1bab10b81e)"
          />
          <input className="button" type="submit" />
        </form>
      </section>
    </>
  );
}

export function FindWalletPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();

  const find = async (publicAddress) => {
    try {
      const response = await axios.post(
        `${blockchainUrl}/wallet/history`,
        { publicAddress },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate(`/wallet-overview/${response.data.wallet.publicAddress}`);
    } catch (error) {
      alert(error.response?.data?.message || "Carteira não encontrada.");
    }
  };

  const submitFormData = async () => {
    const { publicAddress } = getValues();

    if (!publicAddress) {
      alert("Por favor, insira sua chave pública para pesquisa.");
      return;
    }

    await find(publicAddress);
  };

  return (
    <>
      <section className="page-settings">
        <Navbar />
        <form className="create-wallet" onSubmit={handleSubmit(submitFormData)}>
          <input
            {...register("publicAddress")}
            className="form"
            type="text"
            placeholder="Chave Pública (Ex.: a6716bb85be6dfaf1bab10b81e)"
          />
          <input className="button" type="submit" />
        </form>
      </section>
    </>
  );
}

export function WalletOverviewPage() {
  const { publicAddress } = useParams();
  const [walletData, setWalletData] = useState();

  const find = async (publicAddress) => {
    try {
      const response = await axios.post(
        `${blockchainUrl}/wallet/history`,
        { publicAddress },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setWalletData(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Erro desconhecido.");
    }
  };

  useEffect(() => {
    find(publicAddress);
  }, []);

  return (
    <>
      <section className="page-settings">
        <Navbar />
        <div className="transaction-history">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {walletData &&
                walletData.history &&
                walletData.history.map((hash, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{hash}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
