import React from "react"
import { useLanguage } from "../../context/LanguageContext"

import logo from '../../images/logo/logo.png'

const FooterMain = () => {
    const {t} = useLanguage()

    return (
        <footer className="mt-16 bg-slate-900 text-white grid grid-cols-4 py-4 px-10">
            <section>
                <img src = {logo} alt = "Logo Circus" width={100} height={100} className="w-20 h-20"/>  
            </section>    
        </footer>
    )
}

export default FooterMain
