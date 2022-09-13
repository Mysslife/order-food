import styles from "../styles/CreatePizza.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const CreatePizza = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const changePrice = (e, sizeIndex) => {
    const currentPrices = prices;
    currentPrices[sizeIndex] = e.target.value;
    setPrices(currentPrices);
    // console.log(prices);
  };

  // CREATE A PIZZA:
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dbizp2mvk/image/upload",
        data
      );

      //   console.log(uploadRes.data);

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="file"
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.priceContainer}>
            <label className={styles.label}>Prices</label>
            <input
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
              className={`${styles.input} ${styles.inputSm}`}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Extra name"
              name="extraName"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Extra price"
              name="extraPrice"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {`${option.extraName} - $${option.extraPrice}`}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.createButton} onClick={handleCreate}>
          Create Pizza
        </button>
      </div>
    </div>
  );
};

export default CreatePizza;
