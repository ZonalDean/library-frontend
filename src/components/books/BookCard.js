
function BookCard() {
    return (
  <div className="container "  style={{height: "30vh"}} >
                <div className="h-20vh">
                    <div 
                    className="mt-2"
                    style={{backgroundImage: "url(https://prodimage.images-bn.com/pimages/9780425266540_p0_v6_s550x406.jpg)", height: "20vh", backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "center center"}} />
                </div>

                <button className="btn btn-primary text-light my-3" >Borrow Now</button>

        </div>



    )
}

export default BookCard
/*
        <div className="card col-2">
            <img className="card-image-top" src="https://prodimage.images-bn.com/pimages/9780425266540_p0_v6_s550x406.jpg" />
            <div className="card-body">
                <button className="btn btn-primary col" style={{marigin: "auto"}}>
                    Borrow
                </button>
            </div>
        </div>
*/