import { useHistory } from "react-router";
import "./style.css";

const Card = ({ user }) => {
  const history = useHistory();

  return (
    <div className="welcome">
      <h2>Bem vindo, {user.name}</h2>
      <h3>Seus dados:</h3>
      <span>Email: {user.email} </span>
      <span>Telefone: {user.cellphone} </span>
      <span>Endereço: {user.address} </span>
      <button onClick={() => history.push("/")}>Cadastrar novo usuário</button>
    </div>
  );
};

export default Card;
