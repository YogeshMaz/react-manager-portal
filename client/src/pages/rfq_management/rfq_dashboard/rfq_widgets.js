const widgets = (props) => {
  const iconStyle = {
    marginLeft: '10px',
    fontWeight: '800',
    width: '35px',
    height: '35px',
    padding: '5px',
  };
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
              </h6>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="mb-0">
                    <strong>Value INR</strong>
                  </p>
                  <span>₹{props.value ? props.value : "0"}</span>
                </div>
                <div>
                  <b className="btn btn-light rounded-circle " style={iconStyle} >
                    {props.count ? props.count : "0"}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default widgets;
