import React, { useState } from 'react'
import { ArrowRight, TextAlignJustify } from 'lucide-react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className='flex justify-between items-center py-4 px-4 lg:px-10 xl:px-20'>

            <h3 className='text-3xl md:text-4xl lg:text-5xl font-light m-0'>DEVCORE</h3>

            {/* desktop nav */}
            {/* CHANGED: Swapped lg:flex to xl:flex so it waits for a wider screen */}
            <nav className='hidden xl:flex items-center gap-6 xl:gap-12'>
                <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                    HOME
                </a>
                <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                    SERVICES
                </a>
                <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                    SOLUTIONS
                </a>
                <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                    PROCESS
                </a>
                <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                    ABOUT
                </a>
                <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                    CONTACT
                </a>
            </nav>

            {/* CHANGED: Swapped lg:flex to xl:flex for the button */}
            <button className='hidden xl:flex items-center gap-1 text-base tracking-wider transition-all duration-500 hover:bg-[#72ab01] bg-[#99e502] text-black px-4 py-3 rounded-3xl cursor-pointer'>
                GET STARTED <span><ArrowRight /></span>
            </button>

            {/* Mobile Nav Toggle */}
           
            <button onClick={toggleMenu} className='xl:hidden text-3xl p-2 z-50'>
                <TextAlignJustify />
            </button>

            {/* mobile nav */}
         
            <div id='mobileMenu' className={`${isMenuOpen ? 'block' : 'hidden'} fixed top-20 left-0 w-full bottom-0 p-5 xl:hidden z-40 bg-[#99bb63] bg-opacity-6o
             backdrop-blur-md`}>
                <nav className='flex flex-col gap-6 items-center mt-10'>
                    <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                        HOME
                    </a>
                    <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                        SERVICES
                    </a>
                    <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                        SOLUTIONS
                    </a>
                    <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                        PROCESS
                    </a>
                    <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                        ABOUT
                    </a>
                    <a href="" className="text-base tracking-wider transition-colors hover:text-gray-300">
                        CONTACT
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Header