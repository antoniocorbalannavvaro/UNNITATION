import UniButton from "./(components)/UniButton";


export default function NavBar() {
    return (
        <div className="container-fluid gradient-background">
            <div className="row p-0">
                <div className="col p-0">
                    <p className="logo">UNNITATION</p>
                </div>
                <div className="col">
                    <UniButton onClick={() => console.log('Hola')}>Holaaa</UniButton>
                </div>
            </div>
            
        </div>
    );
}