import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.products.length);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>0988 234 497</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Homepage</li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Link href={"/"} passHref>
            <Image
              style={{ cursor: "pointer" }}
              src="/img/logo.png"
              alt=""
              width="160"
              height="69"
            />
          </Link>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href={`/cart`} passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30" height="30" />
            {quantity > 0 && <div className={styles.counter}>{quantity}</div>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
