import React, { useState, useEffect } from "react";

import { HELPER } from "../services";
import {
  fetchPopularRecipes,
  // fetchRecipes as fetchRecipesAPI,
  fetchRecipesByCategory,
} from "../services/api";

import HeroSlider from "../components/HeroSilder";

const CATEGORIES = ["breakfast", "dessert"];

const Home = () => {
  const [categoryRecipes, setCategoryRecipes] = useState({});
  const [popularRecipes, setPopularRecipes] = useState([]);

  const loadCategoryRecipes = async (category) => {
    try {
      const results = await fetchRecipesByCategory(category, 0);
      setCategoryRecipes((prev) => ({ ...prev, [category]: results || [] }));
    } catch (err) {
      HELPER.toaster?.error?.("Failed to fetch category recipes.");
    }
  };

  const fetchBestRecipes = async () => {
    try {
      const results = await fetchPopularRecipes(6);
      setPopularRecipes(results);
    } catch (err) {
      HELPER.toaster?.error?.("Failed to fetch popular recipes.");
    }
  };

  useEffect(() => {
    CATEGORIES.forEach((cat) => loadCategoryRecipes(cat));
    fetchBestRecipes();
  }, []);

  return (
    <>
      <HeroSlider />
      <section className="top-catagory-area section-padding-80-0">
        <div className="container">
          <div className="row">
            {CATEGORIES.map((cat) => (
              <React.Fragment key={cat}>
                {categoryRecipes[cat]?.map((recipe) => {
                  return (
                    <div className="col-12 col-lg-6" key={recipe.id}>
                      <div className="single-top-catagory">
                        <img src={recipe?.image} alt="" />
                        <div className="top-cta-content">
                          <h6>{recipe?.title}</h6>
                          <a
                            href={`/recipe/${recipe?.id}`}
                            className="btn delicious-btn"
                          >
                            See Full Receipe
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="best-receipe-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h3>The best Receipies</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {popularRecipes?.map((data) => {
              return (
                <div className="col-12 col-sm-6 col-lg-4" key={data?.id}>
                  <div className="single-best-receipe-area mb-30">
                    <img src={data?.image} alt="" />
                    <div className="receipe-content">
                      <a href="receipe-post.html">
                        <h5>{data?.title}</h5>
                      </a>
                      <div className="ratings">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star-o" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-area bg-img bg-overlay">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="cta-content text-center">
                <h2>Gluten Free Receipies</h2>
                <p>
                  Fusce nec ante vitae lacus aliquet vulputate. Donec
                  scelerisque accumsan molestie. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia Curae; Cras
                  sed accumsan neque. Ut vulputate, lectus vel aliquam congue,
                  risus leo elementum nibh
                </p>
                <a href="#!" className="btn delicious-btn">
                  Discover all the receipies
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
