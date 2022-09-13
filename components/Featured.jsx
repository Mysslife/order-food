import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);

  const images = [
    "/img/featured2.jpg",
    "/img/featured.jpg",
    "/img/featured3.jpg",
  ];

  //   HANDLE SLIDE:
  const handleSlide = (direction) => {
    if (direction === "left") {
      setIndex(index === 0 ? 2 : index - 1);
    } else {
      setIndex(index === 2 ? 0 : index + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => handleSlide("left")}
        className={styles.arrowContainer}
        style={{ left: 0 }}
      >
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain" />
      </div>
      <div
        className={styles.wrapper}
        s
        style={{
          transform: `translateX(${index * -100}vw)`,
          transition: "all 1.4s ease-in-out",
        }}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.imgContainer}>
            <Image objectFit="cover" src={image} alt="" layout="fill" />
          </div>
        ))}
      </div>
      <div
        onClick={() => handleSlide("right")}
        className={styles.arrowContainer}
        style={{ right: 0 }}
      >
        <Image src="/img/arrowr.png" alt="" layout="fill" objectFit="contain" />
      </div>
    </div>
  );
};

export default Featured;
