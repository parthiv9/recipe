import Slider from "react-slick";
import { useEffect, useState } from "react";
import { fetchPopularRecipes } from "../services/api";
import { Button, Col, Container, Row } from "react-bootstrap";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    const loadSlides = async () => {
      setLoading(true);
      const data = await fetchPopularRecipes(3);
      setSlides(data);
      setLoading(false);
    };
    loadSlides();
  }, []);

  if (loading) {
    return <p className="text-center">Loading slides...</p>;
  }

  if (!slides.length) {
    return <p className="text-center">No slides available</p>;
  }

  return (
    <section className="hero-area">
      <Slider {...settings} className="hero-slides">
        {slides.map((slide) => (
          <div key={slide.id} className="single-hero-slide">
            <img src={slide.image} alt={slide.image} />
            <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"></div>
            <Container className="h-100">
              <Row className="align-items-center h-100">
                <Col xs={12} md={7} lg={6}>
                  <div
                    className="slide-content text-white "
                    data-animation="fadeInUp"
                    data-delay="100ms"
                  >
                    <h2>{slide.title}</h2>
                    <Button
                      href={`/recipe/${slide.id}`}
                      className="delicious-btn"
                    >
                      See Recipe
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
