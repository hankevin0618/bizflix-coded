import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const RightPanel_Course = ({thisEpisode, isSubscribing}) => {

    const [getEpisode, setGetEpisode] = useState([])
    const [episodeLoaded, setEpisodeLoaded] = useState(false)

    useEffect(() => {
        if(thisEpisode){
            let array = thisEpisode.episode_detail
            setGetEpisode(array)
            setEpisodeLoaded(true)
        }
        
    },[thisEpisode])

    const onStartWathcing = (e) => {
        e.preventDefault();
    }

    const HandleButton = () => {
        if(isSubscribing){
            return(
                <button className="main-button w-25">Start Watching</button>
            )
        }

        return(
            <div>
                <p>Looks like you're not subscribing yet!</p>
                <Link to="/payment">Subscribe</Link>                        
            </div>
        )
    }
    
    return(
        <div className="col-md-10 mx-auto">
            {
                episodeLoaded ?

                <div >
                    <img src={getEpisode.pictures.sizes[3].link} className="w-100" />
                    <h2>{getEpisode.name}</h2>
                    <p>{getEpisode.description}</p>
                    <p>{getEpisode.created_time}</p>
                    <HandleButton />
                    
                </div>

                :

                <div>
                    Loading...
                </div>
            }
        </div>
    )
}

export default RightPanel_Course