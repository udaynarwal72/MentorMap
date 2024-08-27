import { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'

function About() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar />
            <div className='flex items-center justify-center'>
                    AboutUs page
            </div>
        </>
    )
}

export default About;
