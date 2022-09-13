import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import axios from "axios";
import CreatePizza from "../components/CreatePizza";
import AddButton from "../components/AddButton";
import { useState } from "react";

export default function Home({ pizzaList, isAdmin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        {/* Head component giúp cải thiện SEO cho website trong nextjs */}
        <title>Pizza Orders</title>
        <meta name="description" content="Best pizza restaurant in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {isAdmin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <CreatePizza setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let isAdmin = false;

  if (myCookie.pizzaToken === process.env.TOKEN) {
    isAdmin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products/");
  return {
    props: {
      pizzaList: res.data,
      isAdmin,
    },
  };
};
