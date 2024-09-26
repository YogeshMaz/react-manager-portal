const DashboardBox = (props) => {
    return(
            <>
                
                <div className="d-flex justify-content-between w-100">
                    <div className="col1">
                        <h4 className="text-dark mb-0"> {props.content? props.content: ''}</h4> 
                        <span className="text-dark">{props.title? props.title: '-'}</span> 
                    </div>
                    <div className="ml-auto d-flex justify-content-center align-items-center">
                        {
                            props.icon?
                            <span span className="icon">
                                {props.icon? props.icon: ''}
                            </span>
                            :
                            ''
                        }
                    </div>

                {/* <div className="d-flex align-items-center w-100">
                    <h6 className="text-white mb-0 mt-0">Last Month</h6>
                    <Button className="ml-auto toggleIcon"> <HiDotsVertical/></Button>
                </div> */}

            </div>
        </>
    )
}

export default DashboardBox