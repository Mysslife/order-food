import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [priceAsSize, setPriceAsSize] = useState(pizza.prices[0]);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - priceAsSize;
    setPriceAsSize(pizza.prices[sizeIndex]);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.extraPrice);
      setExtras([...extras, option]);
    } else {
      changePrice(-option.extraPrice);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  // REDUX:
  const dispatch = useDispatch();

  const handleAdd = () => {
    const newProduct = {
      ...pizza,
      quantity,
      totalOneOrder: price,
      extras,
    };
    dispatch(addNewProduct(newProduct));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>

        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div onClick={() => handleSize(0)} className={styles.size}>
            <Image alt="" src="/img/size.png" layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div onClick={() => handleSize(1)} className={styles.size}>
            <Image alt="" src="/img/size.png" layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div onClick={() => handleSize(2)} className={styles.size}>
            <Image alt="" src="/img/size.png" layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option, index) => (
            <div key={index} className={styles.option}>
              <input
                type="checkbox"
                id={option.extraName}
                name={option.extraName}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.extraName}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button onClick={handleAdd} className={styles.button}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
