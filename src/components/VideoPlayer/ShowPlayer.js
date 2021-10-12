import Vimeo from '@u-wave/react-vimeo'


const ShowPlayer = () => {


    const [episodeTitle, setEpisodeTitle] = useState('')
    const [episodeDescription, setEpisodeDescription] = useState('')
    const [episodeLink, setEpisodeLink] = useState('https://vimeo.com/577006350')
    const [episodeNum, setEpisodeNum] = useState('')

    const _ShowPlayer = (e) => {
        let playerPopup = document.getElementById('player-popup')
        let darkBack = document.getElementById('dark-back')


        let link = e.target.getAttribute('link')
        let description = e.target.getAttribute('description')
        let name = e.target.name
        let epNum = e.target.getAttribute('id')
        epNum = parseInt(epNum) + 1
        toString(epNum)

        playerPopup.style.display = 'block'
        darkBack.style.display = 'block'

        setEpisodeTitle(name)
        setEpisodeLink(link)
        setEpisodeDescription(description)
        setEpisodeNum(epNum)
    }

    const onClosePopup = (e) => {
        e.preventDefault();
        let playerPopup = document.getElementById('player-popup')
        let darkBack = document.getElementById('dark-back')

        playerPopup.style.display = 'none'
        darkBack.style.display = 'none'

    }
    return(
        <div>
            <div id="player-popup" className="text-center scroll-hidden col-md-8 col-lg-7 ">
                <div className="col-12" style={{ textAlign: 'right' }}><button className="transparent-button text-white" onClick={onClosePopup} ><FontAwesomeIcon icon={['fas', 'times-circle']} size="3x" /></button></div>
                <div className="col-12 my-3">
                    <h2 style={{ fontWeight: 'bold' }}>{episodeTitle} </h2>
                    <p>Full Screen - Double Click The Video</p>
                    <p style={{ color: '#fe9005' }}>Episode {episodeNum} </p>
                </div>
                <div className="col-lg-12 col-xl-9 d-block mx-auto">
                    <Vimeo
                        video={episodeLink}
                        responsive={true}
                        width={500}
                    />

                </div>
                <div className="col-md-9 col-lg-7 d-block mx-auto mt-3">
                    <p>
                        {episodeDescription}
                    </p>
                </div>
            </div>
            <div id="dark-back"></div>
        </div>
    )
}

export default ShowPlayer