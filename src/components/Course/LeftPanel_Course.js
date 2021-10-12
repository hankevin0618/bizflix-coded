import { Link } from "react-router-dom"

const LeftPanel_Course = ({episodes, viewing, categoryID}) => {    
    let _viewing = parseInt(viewing)
    const HandlePanel = ({title, epNum}) => {      

        if(epNum === _viewing){
            return(
                <div className="p-2 text-center m-3" style={{backgroundColor:'#2b5bc8'}}>
                    <Link to={'/'} className="text-white" style={{textDecoration:'none'}}>{title}</Link>
                </div>
            )
        }
        return(
            <div className="p-2 text-center m-3" style={{backgroundColor:'#292929'}}>
                <Link to={`/course/${categoryID}/${epNum}`} className="text-white" style={{textDecoration:'none'}}>{title}</Link>
            </div>
        )
    }
    
    return(
        <div>
            {
                episodes ? episodes.map((el, i) => {

                    return(
                        <HandlePanel 
                            title={el.episode_detail.name} 
                            key={i} 
                            epNum={i}
                        />
                    )
                })

                : <div className="text-white">Loading...</div>
            }
        </div>
    )
}

export default LeftPanel_Course;