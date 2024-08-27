import { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'

function ContactUs() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar />
            <div className='flex items-center justify-center'>
                    Contact page
            </div>
        </>
    )
}

export default ContactUs;
