import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "./components/Card";

function App() {
  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    emailConfirmation: yup
      .string()
      .required("Confirmação de e-mail obrigatória")
      .oneOf([yup.ref("email"), null], "E-mails devem coincidir"),
    cellphone: yup
      .string()
      .required("Telefone obrigatório")
      .matches(
        /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/,
        "Telefone inválido"
      ),
    address: yup.string().required("Endereço obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    passwordConfirmation: yup
      .string()
      .required("Confirmação de senha obrigatória")
      .oneOf([yup.ref("password"), null], "Senhas devem coincidir"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const history = useHistory();

  const onSubmitFunction = (data) => {
    setUser(data);
    history.push("/card");
  };

  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <h3>Formulário</h3>
          <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
            <input placeholder="Nome *" {...register("name")} />
            {errors.name?.message}
            <input placeholder="E-mail *" {...register("email")} />
            {errors.email?.message}
            <input
              placeholder="Confirmação de email *"
              {...register("emailConfirmation")}
            />
            {errors.emailConfirmation?.message}
            <input placeholder="Telefone *" {...register("cellphone")} />
            {errors.cellphone?.message}
            <input placeholder="Endereço *" {...register("address")} />
            {errors.address?.message}
            <input
              type="password"
              placeholder="Senha *"
              {...register("password")}
            />
            {errors.password?.message}
            <input
              type="password"
              placeholder="Confirmação de senha *"
              {...register("passwordConfirmation")}
            />
            {errors.passwordConfirmation?.message}
            <button type="submit">Cadastrar</button>
          </form>
        </Route>
        <Route exact path="/card">
          <Card user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
