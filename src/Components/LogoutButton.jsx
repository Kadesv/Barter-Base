export default function LogoutButton({ signStatus, handleLogOut }) {
  return (
    !signStatus ?
      <>
        <a href='/signIn'>Sign In</a>
      </>
      :
      <>
        <button as="a"onClick={handleLogOut}>Sign Out</button>
      </>
  );
}