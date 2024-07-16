import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import {Dropdown} from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import circus from '../images/assets/logo-circus.png';

export default function UserHeader() {
    const items = [
        { 
            label: 'Accueil',
            url: '/',
        }, 
        { 
            label: 'Voyages',
            url : '/trip'
        },
        { label: 'Tarifs'},
        { label: 'Blog'},
        { 
            label: 'A propos',
            url : '/about',
        },
    ];

    const [selectLang, setSelectLang] = useState('')
    const lang = [
        { name : 'Français', code : 'FR' },
        { name : 'Malagasy', code : 'MG' },
        { name : 'English', code : 'EN' },
    ]

    const endMenuDesktop = (
        <div className='flex justify-start space-x-2'>
            <Link to = "/login">
                <Button label='Se connecter' className='bg-main hover: shadow-xl text-sm font-poppins border border-none rounded text-black h-6 py-4' />
            </Link>

            <Link to = "/register">
                <Button label="S'inscrire" className='bg-green-300 shadow-xl text-sm font-poppins border border-none rounded text-black h-6 py-4' />
            </Link>
        </div>
    )

    const endMenuMobile = (
        <img src= {circus} alt = "Logo de Circus" className='w-28 h-24 max-[524px]:w-20 max-[524px]:h-16 ms-2'/>    
    )

    return (
        <header>
             <div className='mt-3 flex justify-between min-[961px]:hidden max-[470px]:max-w-full'>
                <Menubar model={items} end = {endMenuMobile} className = "border border-none font-poppins text-sm bg-white custom-menubar md:bg-white"/>
             
                <div className='flex justify-center items-center space-x-4'>
                    <i className='pi pi-globe text-gray-500'></i>

                    <Dropdown value = {selectLang} onChange={(e) => setSelectLang(e.target.value)}
                        options={lang} optionLabel='code' placeholder='FR' 
                        className=' h-8 w-16 -mt-2 border border-none shadow-md custom-p-dropdown'
                        panelClassName='text-sm'
                        dropdownIcon = "pi pi-chevron-down text-sm mt-1"/>
                </div>
             </div>
             
            <div className='flex justify-center space-x-44 mt-2 max-[1300px]:space-x-12 max-[960px]:hidden '>
                <img src= {circus} alt = "Logo de Circus" className='w-28 h-24 max-[524px]:w-20 max-[524px]:h-16'/>
                
                <Menubar model={items} end = {endMenuDesktop} className = "border border-none font-poppins text-sm custom-menubar"/>


                <div className='flex justify-center items-center mt-2 space-x-4'>
                    <i className='pi pi-globe text-gray-500'></i>

                    <Dropdown value = {selectLang} onChange={(e) => setSelectLang(e.target.value)}
                        options={lang} optionLabel='code' placeholder='FR' 
                        className=' h-8 w-16 -mt-2 border border-none shadow-md custom-p-dropdown'
                        panelClassName='text-sm'
                        dropdownIcon = "pi pi-chevron-down text-sm mt-1"/>
                </div>  
                
            </div>
        </header>
    )
}
        