import SignupLeft from "../../components/signup/SignupLeft";
import SignupRight from "../../components/signup/SignupRight";

export default function SignUp() {
  return (
    <div className="min-h-[90vh] flex">
      <SignupLeft />
      <SignupRight />
    </div>
  );
}

