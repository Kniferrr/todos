import React, { useEffect, useState } from "react";
import useTaskStore from "../moduls/store/store";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const { setLogin, login } = useTaskStore();

  useEffect(() => {
    if (login.length > 0) {
      navigate("/");
    }
  }, [login]);

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNickname(e.target.value);
  };

  const handleEnterPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    console.log(`Entered nickname: ${nickname}`);
    setLogin(nickname);
  };

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
