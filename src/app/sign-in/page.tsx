import { SignIn } from "@clerk/nextjs";
import './styles.scss';

export default function Page() {
  return (
    <div className="sign-in-wrapper">
      <SignIn />
    </div>
  );
}
