import { SignUp } from "@clerk/nextjs";
import './styles.scss';

export default function Page() {
  return (
    <div className="sign-up-wrapper">
      <SignUp />
    </div>
  );
}
