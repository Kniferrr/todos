import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../moduls/store/store";
import "./LoginPage.scss";

function LoginPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const { setLogin, login } = useTaskStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    setLogin(nickname);
  };

  useEffect(() => {
    if (login.length > 0) {
      navigate("/");
    }
  }, [login, navigate]);

  return (
    <div className="login-page-container">
      <input
        type="text"
        placeholder="Enter nickname"
        value={nickname}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default LoginPage;
