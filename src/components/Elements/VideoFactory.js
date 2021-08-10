import axios from 'axios';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VideoFactory = ({ categoryID, categoryName, ShowPlayer }) => {

    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [episodes, setEpisodes] = useState([])


    const getVideos = async () => {
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
        getVideos();
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
                                <div className="" key={categoryID + '-' + i} >
                                    <button className="transparent-button" onClick={ShowPlayer}  >
                                        <img src={episode.pictures.sizes[3].link} name={episode.name} id={i} link={episode.link} description={episode.description} alt="episode_thumb" />
                                        <p className="mt-2">Episode {i + 1}</p>
                                    </button>
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