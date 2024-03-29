import React from "react";
import Navbar from "../pagesComponent/Navbar";
import { useState, useEffect } from "react";
import Footer from "../pagesComponent/Footer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  BtnStyle,
  CubeStyle,
  BackgroundWrapper,
  Background,
} from "../styles/GlobalStyled";
import "../styles/PreviewStore.css";
import "../styles/Store.css";
import CubeImages from "../assests/feather/box.svg";
import { Link } from "react-router-dom";

function Store() {
  const [allProducts, setAllProducts] = useState([]);
  const endpoint = import.meta.env.VITE_ENDPOINT;

  const data = async () => {
    const respone = await fetch(`${endpoint}?sort=desc`);
    const allData = await respone.json();
    setAllProducts(allData);
  };

  useEffect(() => {
    data();
  }, []);

  const ShowDatas = () => {
    return allProducts.slice(0, showValues).map((result, index) => {
      return (
        <Link to={`/products/${result.id}`} key={index}>
          <div className="cardWrapper shadow-xl hover:shadow-2xl">
            <div className="cardImagesWrapper">
              <LazyLoadImage
                src={result.image}
                effect="blur"
                className="cardImages"
              />
            </div>
            <div className="cardText">
              <p className="cardTitle">{result.title}</p>
              <p className="cardPrice">${result.price}</p>
              {/* {[result.rating].map((items, i) => {
                if (items?.rate) {
                  return (
                    <p className="cartSales" key={i}>
                      {items.count}pcs sold
                    </p>
                  );
                } else {
                  return null;
                }
              })} */}
              <p className="cardDescription">{result.description}</p>
              <div className="cardCategoryWrapper">
                <p className="cardCategory">{result.category}</p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  const StoreTitle = () => {
    return (
      <>
        <div className="storeTitle">
          <div className="storeTitleContainer">
            <div className="storeTitleWrapper">
              <div className="mainStoreTitleWrapper">
                <p className="mainStoreTitle">
                  Explore <span>All Products✨</span>
                </p>
                <p className="mainStoreDescription">Spend less, Smile More.</p>
              </div>
              <div className="storeCubeImagesWrapper">
                <CubeStyle src={CubeImages} className="storeCubeImagesOne" />
                <CubeStyle src={CubeImages} className="storeCubeImagesTwo" />
              </div>
              <BackgroundWrapper className="storeBackgroundWrapper">
                <Background className="storeBackground"></Background>
              </BackgroundWrapper>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Products = () => {
    return (
      <>
        <div className="products">
          <div className="productsCon">
            <div className="productsWrapper">
              <div className="allProductsWrapper">
                <p className="allProductsTitle">All Products</p>
              </div>
              <div className="productsCategoryWrapper"></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const CardBtn = () => {
    return (
      <>
        <div
          className={`cardBtnWrapper ${
            showValues > 35 ? "deactiveProducts" : "activeProducts"
          }`}
        >
          <BtnStyle type="sumbit" className="cardBtn" onClick={ShowMore}>
            View More
          </BtnStyle>
        </div>
      </>
    );
  };

  const AllProducts = () => {
    return (
      <>
        <div
          className={`isShowedProducts flex justify-center items-center -mb-10 mt-10 ${
            showValues > 35 ? "activeProducts" : "deactiveProducts"
          }`}
        >
          <div className="showedProductsContainer">
            <div className="showedProductsWrapper">
              <p className="isShowProducts">All products has been showed..</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const [showValues, setShowValues] = useState(9);
  const ShowMore = () => {
    setShowValues((prev) => prev * 2);
  };

  return (
    <>
      <Navbar />
      <StoreTitle />
      <Products />
      <div className="cardComponent">
        <div className="cardContainer">
          <ShowDatas />
        </div>
      </div>
      <AllProducts />
      <CardBtn />
      <Footer />
    </>
  );
}

export default Store;
