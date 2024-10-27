import Link from 'next/link'
import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

function SocialRow({ className }: { className?: string }) {
  return (
    <div className={`${className} flex flex-row items-center lg:gap-x-6 gap-x-3 `}>
      <Link href="https://www.linkedin.com/in/phil-labrum-profile/">
        <FaLinkedin className=" lg:h-7 lg:w-7 h-6 w-6" />
      </Link>
      <Link href="https://github.com/Plabrum">
        <FaGithub className=" lg:h-7 lg:w-7 h-6 w-6" />
      </Link>
      <Link href="/#contact">
        <FaEnvelope className="lg:h-7 lg:w-7 h-6 w-6" />
      </Link>
    </div>
  )
}

export default SocialRow
