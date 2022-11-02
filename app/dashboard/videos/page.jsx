import UniButton from "../../(components)/UniButton";
import UniCard from '../../(components)/UniCard'

export default function Page(){
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-8">
                    <div className="row">
                        <div className="col"><h1>Videos</h1></div>
                        <div className="col d-flex justify-content-end"><a href="/dashboard/videos/upload"><UniButton negative={true}>Upload Video</UniButton></a></div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-12">
                        <UniCard>
                            Contenido de la tarjeta
                        </UniCard>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    Filtros
                </div>
            </div>     
        </div>
    )
}