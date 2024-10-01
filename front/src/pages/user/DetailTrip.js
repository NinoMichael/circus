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

            <main className="flex flex-row mt-8">
                <div className="w-[25%]">

                </div>

                <div className="flex flex-row space-x-6 w-[50%]">
                    <div>
                        <img src={sprinter} alt="Transport" className="w-72 h-64 rounded" />
                    </div>

                    <div>
                        <div className="flex flex-row">
                            <Avatar image={besady} shape="circle" />
                            <p className="text-sm mt-2 ms-3">Besady</p>
                        </div>

                        <section className="mt-6">
                            <div className="flex flex-row justify-between space-x-24">
                                <div>
                                    <p className="text-xs text-slate-400">Départ</p>
                                    <p className="text-sm">Antananarivo</p>
                                    <p className="text-sm -mt-1">Gare Maki Andohatapenaka</p>
                                    <p className="text-sm -mt-1">Ven 29 Sept, 17:00</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Places disponibles</p>
                                    <p className="text-sm">24</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between space-x-24 mt-4">
                                <div>
                                    <p className="text-xs text-slate-400">Transport</p>
                                    <p className="text-sm">TAF 3456</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Places disponibles</p>
                                    <p className="text-sm">24</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="bg-white p-4 rounded w-[25%]">

                </div>
            </main>
        </motion.div>
    )

}

export default DetailTrip