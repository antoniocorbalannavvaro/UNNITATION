import UniButton from "./(components)/UniButton";
import UniMenu from "./(components)/UniMenu";
import UniPopUp from "./(components)/UniPopUp";
import UniWizardHome from './(components)/wizards/UniWizardHome'

//Dummie check:
const isOnline = true;

export default function NavBar() {
    return (
        <div className="container-fluid gradient-background">  
            <div className="row p-0 px-2">

                <div className="col-3 p-0 d-flex align-items-center justify-content-start">
                    <a className="text-decoration-none" href="/"><p className="logo">UNNITATION</p></a>
                </div>

                <div className="col-6 d-flex align-items-center justify-content-center">
                    <UniMenu></UniMenu>
                </div>
                
                <div className="col-3 d-flex align-items-center justify-content-end px-3">
                    <UniWizardHome></UniWizardHome>
                    <div style={{padding:'30px'}}>
                    {isOnline ? <UniPopUp></UniPopUp> : null}
                    
                    </div>
                    <a href="/login"><UniButton>LOG IN</UniButton></a>
                    
                </div>
                
            </div>
                  
        </div>
    );
}