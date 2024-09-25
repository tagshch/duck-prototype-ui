import React from "react";

const LoginUser = (username: string, password: string): Promise<string> => {
  // const options: RequestInit = {
  //   method: "POST",
  //   body: JSON.stringify({
  //     username: "",
  //     password: "",
  //   }),
  //   mode: "cors",
  // }

  // fetch("", options)
  //   .then((res) => res.json())
  //   .then((res) => {

  //   });

  return Promise.resolve("token_value_bingo");
}

export type LoginFormProps = {
  callback(token: string): void;
}

export const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <form style={{ margin: "40px auto", width: 340 }}>
      <h4>Authorize</h4>
      <div>
        <input type="text" title="Username" value={username} onChange={(e) => {
          setUsername(e.target.value || "");
        }} />
      </div>
      <br />
      <div>
        <input type="password" title="Password" value={password} onChange={(e) => {
          setPassword(e.target.value || "");
        }} />
      </div>
      <br />
      <div>
        <button type="submit" onClick={() => {
          LoginUser(username, password).then((token) => {
            props.callback(token);
          });
        }}>Submit</button>
      </div>
    </form>
  );
}