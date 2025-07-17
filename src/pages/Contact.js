import Logo from "../assets/img/core-img/logo.png";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <>
      <div className="contact-information-area section-padding-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="logo mb-80">
                <img src={Logo} alt="" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="contact-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum nec varius dui. Suspendisse potenti. Vestibulum ac
                  pellentesque tortor. Aenean congue sed metus in iaculis. Cras
                  a tortor enim. Phasellus posuere vestibulum ipsum, eget
                  lobortis purus.
                </p>
                <p>
                  Orci varius natoque penatibus et magnis dis ac pellentesque
                  tortor. Aenean congue parturient montes, nascetur ridiculus
                  mus.
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div className="single-contact-information mb-30">
                <h6>Address:</h6>
                <p>
                  Rotonda Evangelista 914, Piano 8, San Cosetta a mare, VC 35015
                </p>
              </div>
              <div className="single-contact-information mb-30">
                <h6>Phone:</h6>
                <p>
                  +53 345 7953 32453 <br />
                  +53 345 7557 822112
                </p>
              </div>
              <div className="single-contact-information mb-30">
                <h6>Email:</h6>
                <p>yourmail@gmail.com</p>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="newsletter-form bg-img bg-overlay">
                <form action="#" method="post">
                  <input
                    type="email"
                    name="email"
                    placeholder="Subscribe to newsletter"
                  />
                  <button type="submit" className="btn delicious-btn w-100">
                    Subscribe
                  </button>
                </form>
                <p>
                  Fusce nec ante vitae lacus aliquet vulputate. Donec sceleri
                  sque accumsan molestie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-area section-padding-0-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h3>Get In Touch</h3>
              </div>
            </div>
          </div>

          <ContactForm buttonText="Send Message" />
        </div>
      </div>
    </>
  );
};

export default Contact;
