import { signOut } from 'next-auth/react';

function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </button>
  );
}

export default SignOutButton;