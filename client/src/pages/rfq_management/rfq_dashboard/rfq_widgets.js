const widgets = (props) => {
  return (
    <>
      <div className="col-md-3">
        <div
          className="rfqwidgetBox"
          style={{
            backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
          }}
        >
          <div className="d-flex">
            <div className="iconBox">
              {props.icon ? (
                <span span className="icon">
                  {props.icon ? props.icon : ""}
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="textSec">
              <h6>
                {props.title ? props.title : ""}
                <b className="btn btn-light rounded-circle" style={{ marginLeft: "10px", fontWeight: 800 }}>
                  {props.count ? props.count : "0"}
                </b>
              </h6>
              <p className="mb-0">
                <strong>Value INR</strong>
              </p>
              <span>₹{props.value ? props.value : "0"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default widgets;
