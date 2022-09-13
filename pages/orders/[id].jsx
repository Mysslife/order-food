import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  const status = order.status;

  const discount = order.total === 0 ? 0 : 10;
  const finalTotal = order.total - discount;

  const statusClass = (index) => {
    if (index - status > 1) return styles.undone;
    if (index - status === 1) return styles.inProgress;
    if (index - status < 1) return styles.done;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
              <tr className={styles.tr}>
                <td className={styles.td}>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.total}>${order.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image alt="" src="/img/paid.png" height={30} width={30} />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src="/img/checked.png"
                height={20}
                width={20}
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image alt="" src="/img/bake.png" height={30} width={30} />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src="/img/checked.png"
                height={20}
                width={20}
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image alt="" src="/img/bike.png" height={30} width={30} />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src="/img/checked.png"
                height={20}
                width={20}
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image alt="" src="/img/delivered.png" height={30} width={30} />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src="/img/checked.png"
                height={20}
                width={20}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>${discount}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${finalTotal}
          </div>
          <button disabled className={styles.button}>
            PAID!
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const rest = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: rest.data,
    },
  };
};

export default Order;
