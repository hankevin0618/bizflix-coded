import React from 'react'

const Loading = () => {
    return (
        <div id="loading-container" className="container-fluid">
            <div className="row">
                <div className="mt-5 col-md-12 text-center">
                    <h2 style={{ fontWeight: 'bolder', color: 'white', fintSize: '4vw' }}>Loading...</h2>
                    <div id="loading-anim" className="text-center d-block mx-auto mt-5"></div>
                </div>
            </div>
        </div>

    )
}

export default Loading;