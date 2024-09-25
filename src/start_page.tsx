import * as React from "react";
import Shell from "./shell";
import { LoginForm } from "./login_form";
import { TelegramLogin } from "./telegram_login";

type StartProps = Record<string, string>;

const StartPage: React.FC<StartProps> = (props: StartProps) => {
  // const [token, setToken] = React.useState<string>("");

  // check token - if has - u are auth / not u are not auth
  // React.useEffect(() => {
  //   const token = localStorage.getItem("AUTH_TOKEN");

  //   if (Boolean(token)) {
  //     setToken(token as string);
  //   } else {
  //     setToken("");
  //   }
  // }, []);

  // if (!token) {
  //   return (
  //     <div>
  //       <TelegramLogin
  //         botUsername={"mplusduckbot"}
  //         onAuthCallback={(data) => {
  //           console.log("token received!");
  //           const token = JSON.stringify(data);
  //           localStorage.setItem("AUTH_TOKEN", token);
  //           setToken(token);
  //         }}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Shell
      // token={token} 
      />
    </div>
  );
}

export default StartPage;