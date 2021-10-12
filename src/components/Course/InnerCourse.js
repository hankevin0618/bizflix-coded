import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Header from "../Header";
import LeftPanel_Course from "./LeftPanel_Course";
import RightPanel_Course from "./RightPanel_Course";
import axios from 'axios';
import Loading from '../Elements/Loading'

const InnerCourse = ({isSubscribing}) => {

    let {categoryID, episode} = useParams();
    const [episodes, setEpisodes] = useState([])
    const [loaded, setLoaded] = useState(false)
    
    const getCourse = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/getThumbs`, { categoryID })

            let data = res.data.data.data
            if (data) {
                let array = []
                await data.forEach((element, i) => {
                    array.push({ episode_detail: element, key: i })
                });
                setEpisodes(array)
                setLoaded(true)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCourse();
        if(episodes.length > 0){
            setLoaded(true)
        }
    }, [])
    
    return(
        <>
        {
            !loaded
            ?
            <>
                <Loading />
            </>
            :
            <>
            <div className="container-fluid" style={{backgroundImage:"radial-gradient(#2a2a2a, #1c1a1a)"}}>
                <div className="row">
                    <div className="d-flex mt-5 text-white" style={{minHeight:'100vh'}}>
                        <div className="col-md-3 " style={{minHeight:'500px'}}>
                            <LeftPanel_Course categoryID={categoryID} episodes={episodes} viewing={episode} />
                        </div>
                        <div className="col-md-9">
                            <RightPanel_Course thisEpisode={episodes[episode]} isSubscribing={isSubscribing} />
                        </div>

                    </div>
                </div>
            </div>
            </>

        }

    </>
        
    )
}

export default InnerCourse