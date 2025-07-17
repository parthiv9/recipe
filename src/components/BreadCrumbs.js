import PropTypes from "prop-types";

function Breadcrumbs({ title, backgroundImage }) {
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <div className="breadcumb-area bg-img bg-overlay" style={sectionStyle}>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12">
            <div className="breadcumb-text text-center">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
};

export default Breadcrumbs;
