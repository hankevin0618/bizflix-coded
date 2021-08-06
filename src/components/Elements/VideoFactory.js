import axios from 'axios';
import React, { useEffect, useState } from 'react'

const VideoFactory = ({ categoryID }) => {

    const [test, setTest] = useState([])

    let hey = [];


    const getVideos = async () => {
        try {
            const res = await axios.post('http://localhost:4000/getVideos', { categoryID })
            let data = res.data.data.data;
            if (data) {
                data.forEach(element => {
                    // hey.push(element.uri.replace('s', ''))
                    // console.log(element)

                    hey.push(element.embed.html)

                });

                setTest(hey)
            }


        } catch (error) {
            console.log(error.message)
        }
    }

    const Test = () => {

        console.log(test)
        if (test.length > 0) {

            return (
                <div>
                    {
                        test.forEach(element => {
                            document.getElementById('test').innerHTML += element
                        })
                    }
                </div>
            )
        }

        return (
            <div>
                lol
            </div>
        )
    }



    useEffect(() => {
        getVideos()

    }, [])
    return (
        <div id="test">
            <Test />

        </div>
    )
}


export default VideoFactory