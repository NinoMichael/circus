import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { motion } from 'framer-motion'
import NavigationMenu from '../../components/inc/NavigationMenu'
import { Avatar } from 'primereact/avatar'

import sprinter from "../../images/assets/sprinter.png"
import besady from '../../images/assets/besady.jpg'

const DetailTrip = () => {
    const { t } = useLanguage()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header>
                <NavigationMenu className="custom-bg-main pb-[5vh]" />
            </header>

            <main className="grid grid-cols-3 mt-4">
                <div className="">

                </div>

                <div className="">
                    <div className="flex flex-row">
                        <Avatar image={besady}></Avatar>
                        <p className="text-sm">Besady</p>
                    </div>

                    <div className="flex flex-row">
                        <div>
                            <img src={sprinter} alt="Transport" className="w-72 h-72" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded">

                </div>
            </main>
        </motion.div>
    )

}

export default DetailTrip