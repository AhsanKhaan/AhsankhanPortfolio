import React from 'react'

const Navbar = ({items}:{items: { title: string; icon: React.ReactNode; href: string; target?: string | '_self' }[]}) => {
  return (
    <div className="fixed z-10 top-0 left-0 w-full flex justify-around items-center p-4 bg-transparent transition-colors duration-300">
  <div className="text-3xl color-base font-extrabold" >Ahsan Khan</div>
  <div className="flex space-x-6">
    {items.map((item) => (
      <a href={item.href} target={item.target} key={item.title} className="flex items-center">
        <span>{item.icon}</span>
      </a>
    ))}
  </div>
</div>
  )
}

export default Navbar