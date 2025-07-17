import { useFormContext } from "../context/FormContext";

const ContactForm = ({ buttonText = "Send" }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted! Check console.");
    // Reset form if needed:
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="contact-form-area">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-lg-6">
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-lg-6">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <textarea
                  id="message"
                  rows="6"
                  placeholder="Message"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn delicious-btn mt-30">
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
