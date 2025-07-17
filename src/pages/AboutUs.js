import SaladImg from "../assets/img/core-img/salad.png";
import HamburgerImg from "../assets/img/core-img/hamburger.png";
import RibImg from "../assets/img/core-img/rib.png";
import PancakeImg from "../assets/img/core-img/pancake.png";
import AboutImage from "../assets/img/bg-img/about.png";
import ContactForm from "../components/ContactForm";

const facts = [
  { img: SaladImg, count: 1287, label: "Amazing recipes" },
  { img: HamburgerImg, count: 25, label: "Burger recipes" },
  { img: RibImg, count: 471, label: "Meat recipes" },
  { img: PancakeImg, count: 326, label: "Dessert recipes" },
];
const AboutUs = () => {
  return (
    <>
      <section className="about-area section-padding-80">
        <div className="container">
          {/* Section Heading */}
          <div className="row">
            <div className="col-12">
              <div className="section-heading text-center mb-4">
                <h3>Who we are and what we do?</h3>
              </div>
            </div>
          </div>

          {/* Sub-heading & Paragraph */}
          <div className="row">
            <div className="col-12">
              <h6 className="sub-heading pb-5">
                Donec quis metus ac arcu luctus accumsan. Nunc in justo
                tincidunt, sodales nunc id, finibus nibh. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Fusce nec ante vitae lacus aliquet vulputate. Donec
                scelerisque accumsan molestie.
              </h6>

              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum nec varius dui. Suspendisse potenti. Vestibulum ac
                pellentesque tortor. Aenean congue sed metus in iaculis. Cras a
                tortor enim. Phasellus posuere vestibulum ipsum, eget lobortis
                purus. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Proin malesuada et mauris ut
                lobortis. Sed eu iaculis sapien, eget luctus quam. Aenean
                hendrerit varius massa quis laoreet.
              </p>
            </div>
          </div>

          {/* Cool Facts */}
          <div className="row align-items-center mt-5">
            {facts.map((fact, index) => (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={index}>
                <div className="single-cool-fact text-center">
                  <img src={fact.img} alt={fact.label} className="mb-3" />
                  <h3>
                    <span className="counter">{fact.count}</span>
                  </h3>
                  <h6>{fact.label}</h6>
                </div>
              </div>
            ))}
          </div>

          {/* Image and Paragraph */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <img className="mb-4 img-fluid" src={AboutImage} alt="About" />
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum nec varius dui. Suspendisse potenti. Vestibulum ac
                pellentesque tortor. Aenean congue sed metus in iaculis. Cras a
                tortor enim. Phasellus posuere vestibulum ipsum, eget lobortis
                purus. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Proin malesuada et mauris ut
                lobortis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-area section-padding-0-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h3>Contact Us</h3>
              </div>
            </div>
          </div>

          <ContactForm buttonText="Send" />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
