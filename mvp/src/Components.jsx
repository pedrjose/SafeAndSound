import "./Components.css";
import logo from "./assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./Components.css";

export function Navbar() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();

  const submitFormData = async () => {
    const { publicKey } = getValues();

    if (!publicKey) {
      alert(
        "Por favor, insira sua chave pública para localizarmos sua carteira."
      );
    } else {
      navigate(`/menu/${publicKey}`);
      location.reload();
    }
  };
  return (
    <div className="navbar-settings">
      <form className="find-wallet" onSubmit={handleSubmit(submitFormData)}>
        <input
          {...register("publicKey")}
          className="navbar-form"
          type="text"
          placeholder="Buscar carteira (Ex.: a6716bb85be6dfaf1bab10b81e)"
        />

        <input className="navbar-button" type="submit" />
      </form>
    </div>
  );
}

export function Navbar2() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();

  const submitFormData = async () => {
    const { publicKey } = getValues();

    if (!publicKey) {
      alert(
        "Por favor, insira sua chave pública para localizarmos sua carteira."
      );
    } else {
      navigate(`/menu/${publicKey}`);
      location.reload();
    }
  };
  return (
    <div className="navbar-settings2">
      <form className="find-wallet" onSubmit={handleSubmit(submitFormData)}>
        <input
          {...register("publicKey")}
          className="navbar-form"
          type="text"
          placeholder="Buscar carteira (Ex.: a6716bb85be6dfaf1bab10b81e)"
        />

        <input className="navbar-button" type="submit" />
      </form>
    </div>
  );
}
