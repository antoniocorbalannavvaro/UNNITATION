import UniButton from "./(components)/UniButton";


export default function NavBar() {
    return (
        <div className="container-fluid gradient-background">
            <div className="row p-0 px-2">
                <div className="col p-0 d-flex align-items-center justify-content-start ">
                    <p className="logo">UNNITATION</p>
                </div>
                <div className="col"></div>
                <div className="col d-flex align-items-center justify-content-end px-3">
                    <a href="/login"><UniButton onClick={() => console.log('Hola')}>LOG IN</UniButton></a>
                </div>
            </div>
            
        </div>
    );
}