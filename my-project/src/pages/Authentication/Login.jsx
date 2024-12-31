import LoginLeft from "../../components/login/Loginleft";
import LoginRight from "../../components/login/LoginRight";

export default function Login() {
  return (
    <div className="min-h-[90vh] flex">
      <LoginLeft className="hidden md:block" />
      <LoginRight />
    </div>
  );
}

