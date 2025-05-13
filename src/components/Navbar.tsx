'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const MenuItems = [
    { name: 'Início', href: '/' },
    { name: 'Login', href: '/login' },
    { name: 'Recursos', href: '/recursos' },
    { name: 'Integrações', href: '/integracoes' }
]

export default function Navbar(){
    return (
        <nav className="bg-[#0f1111] text-white px-6 py-3 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-8">
                <Link href="/" className="text-xl font-bold">
                x<span className="text-gray-300">y</span>
                </Link>

                <div className="hidden md:flex space-x-5">
                    {MenuItems.map((item) => (
                        <Link
                          key={`${item.name}-${item.href}`}
                          href={item.href}
                          className="hover:text-yellow-400 transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <Menu as="div" className="relative">
                    <Menu.Button className="inline-flex items-center">
                        PT-BRA <ChevronDownIcon className=" w-4 h-4 ml-1"/>
                    </Menu.Button>
                </Menu>   

                <button className="bg-blue-600 hover:bg-blue-500 px4 py-2 rounded text-white font-semibold transition">
                    Assine o xy
                </button>
            </div>
        </nav>
    )
}