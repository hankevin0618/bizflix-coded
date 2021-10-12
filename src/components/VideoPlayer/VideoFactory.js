import axios from 'axios';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

const VideoFactory = ({ categoryID, categoryName }) => {

    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [episodes, setEpisodes] = useState([])


    const getThumbs = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/getThumbs`, { categoryID })

            let data = res.data.data.data
            if (data) {
                let array = []
                await data.forEach((element, i) => {
                    array.push({ episode_list: element, key: i })
                });
                setEpisodes(array)
                setIsVideoLoaded(true)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    if (!isVideoLoaded) {
        getThumbs();
    }




    if (isVideoLoaded) {

        const onScrollLeft = (e) => {
            e.preventDefault();
            const container = document.getElementById(categoryID + '-container');
            let x = container.scrollLeft

            container.scrollTo(x - 350, 0)
        }

        const onScrollRight = (e) => {
            e.preventDefault();
            const container = document.getElementById(categoryID + '-container');
            let x = container.scrollLeft

            container.scrollTo(x + 350, 0)

        }


        return (
            <div className="my-5 category-container d-block mx-auto position-relative">
                <h4 style={{ color: '#f5f5f5' }}>{categoryName}</h4>
                <div id={categoryID + "-container"} className="d-flex overflow-scroll scroll-hidden align-items-center">
                    <div className="video-scroll-button" style={{ left: '-5%', bottom: '50%' }}>
                        <button name="leftScroll" onClick={onScrollLeft} ><FontAwesomeIcon name="leftArrow" icon={['fas', 'angle-left']} size="3x" /></button>
                    </div>
                    {
                        episodes.map((episode, i) => {
                            episode = episode.episode_list
                            return (
                                <div id={categoryID} key={categoryID + '-' + i}  style={{marginRight: '30px'}}>
                                    <Link to={`/course/${categoryID}/${i}`} className="transparent-button" style={{textDecoration:'none'}}  >
                                        <img style={{visibility:'none'}} src={episode.pictures.sizes[3].link} name={episode.name} id={i} link={episode.link} description={episode.description} alt="episode_thumb" />
                                        <p className="mt-2 text-center" style={{}}>Episode {i + 1}</p>
                                    </Link>
                                    {/* <p className="overflow-hidden scroll-hidden text-center" style={{ width: '300px' }}>{episode.name}</p> */}
                                </div>
                            )
                        })

                    }

                    <div className="video-scroll-button"
                        style={{ right: '-5%', bottom: '50%' }}

                    >
                        <button name="rightScroll" onClick={onScrollRight}><div><FontAwesomeIcon name="rightArrow" icon={['fas', 'angle-right']} size="3x" /></div></button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="d-flex text-center">
            <p className="text-center d-block mx-auto">
                Loading...

            </p>
        </div>
    )
}


export default VideoFactory