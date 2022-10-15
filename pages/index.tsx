import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

/* Components */
import Contact from "../components/contact/Contact";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    console.log(session);
    return (
      <>
        <p>
          Signed in as {session.user?.name || session.user?.email}
          <button type="submit" onClick={() => signOut()}>
            Sign out
          </button>
        </p>
        <Contact />
      </>
    );
  }
  return (
    <div className={styles.container}>
      <button type="submit" onClick={() => signIn()}>
        Sign in
      </button>
      <Contact />
    </div>
  );
};

export default Home;
