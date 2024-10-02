import React, { useState } from "react"
import { motion } from "framer-motion"
import NavigationMenu from "../../components/inc/NavigationMenu"
import { useLanguage } from "../../context/LanguageContext"
import SearchBar2 from "../../components/SearchBar2"
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { Paginator } from 'primereact/paginator'
import { useNavigate } from 'react-router-dom'

import busBlack from "../../images/icons/bus-black.png"
import bus from "../../images/icons/bus.png"
import line from "../../images/icons/line.png"
import sprinter from "../../images/assets/sprinter.png"
import besady from "../../images/assets/besady.jpg"
import { Dialog } from 'primereact/dialog'

const ListTrip = () => {
    const { t } = useLanguage()
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)
    const [visibleDialog, setVisibleDialog] = useState(false)

    const navigate = useNavigate()

    const SwitchToDetail = () => {
        navigate('/detail-trip')
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header>
                <NavigationMenu className="custom-bg-main pb-[15vh]" />
                <div className="-mt-12">
                    <SearchBar2 className="flex mx-auto w-[60%] justify-center items-center bg-white h-24 shadow rounded" />
                </div>
            </header>

            <main className="flex flex-row m-12">
                <section className="bg-white shadow-lg rounded-lg text-sm w-52 float-start">
                    <div className="h-12 w-full rounded-t-lg bg-slate-900 text-white p-2">
                        <h3 className="font-kanit text-base text-center">Tarif de voyage</h3>
                    </div>
                </section>

                <div>
                    <section className="ms-6 grid grid-cols-2 space-x-2 gap-3">
                        <div className="bg-white border rounded flex flex-row p-4 divide-x w-[32.5rem]">
                            <div className="px-6">
                                <div className="flex flex-row">
                                    <Avatar image={besady} shape="circle" className="me-3" />
                                    <h3 className="mt-2 font-kanit">Besady</h3>
                                </div>

                                <div className="mt-8">
                                    <img src={sprinter} alt="Bus" className="w-72 h-24 rounded" />
                                </div>
                            </div>

                            <div className="px-6">
                                <div className="flex flex-row">
                                    <Button label="Carte" className="bg-slate-900 text-[0.7em] text-white rounded border-none outline-none font-poppins h-6 cursor-pointer" icon="pi pi-map-marker" />
                                    <p className="text-xs mt-1 ms-3"> - <span className="ms-2">4 places restants</span></p>
                                </div>

                                <div className="mt-8 flex flex-row w-[22rem]">
                                    <div>
                                        <p className="text-xs">Lun 29</p>
                                        <p className="-mt-1 text-lg font-bold">17:00 <img src={busBlack} alt="Bus" className="w-8 h-8 -mt-8 ms-16" /></p>
                                        <p className="-mt-1 text-sm">Antananarivo</p>
                                    </div>

                                    <div className="relative">
                                        <img src={line} alt="Ligne" className="mt-2" />
                                        <p className="absolute top-3 left-12 p-1 bg-white text-sm">14h</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-end ms-12">Mar 30</p>
                                        <p className="-mt-1 text-lg font-bold text-end">07:00 <img src={bus} alt="Bus" className="w-8 h-8 -mt-8 ms-2" /></p>
                                        <p className="-mt-1 text-sm text-end ms-4">Mahajanga</p>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between mt-10">
                                    <p className=" text-sm"><i className="pi pi-car me-3"></i>TAF 3456</p>
                                    <Button label="Détail" className="text-sm border-none outline-none font-poppins h-8 me-12 -mt-2" onClick={SwitchToDetail} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border rounded flex flex-row p-4 divide-x w-[32.5rem]">
                            <div className="px-6">
                                <div className="flex flex-row">
                                    <Avatar image={besady} shape="circle" className="me-3" />
                                    <h3 className="mt-2 font-kanit">Besady</h3>
                                </div>

                                <div className="mt-8">
                                    <img src={sprinter} alt="Bus" className="w-72 h-24 rounded" />
                                </div>
                            </div>

                            <div className="px-6">
                                <div className="flex flex-row">
                                    <Button label="Carte" className="bg-slate-900 text-[0.7em] text-white rounded border-none outline-none font-poppins h-6 cursor-pointer" icon="pi pi-map-marker" />
                                    <p className="text-xs mt-1 ms-3"> - <span className="ms-2">4 places restants</span></p>
                                </div>

                                <div className="mt-8 flex flex-row w-[22rem]">
                                    <div>
                                        <p className="text-xs">Lun 29</p>
                                        <p className="-mt-1 text-lg font-bold">17:00 <img src={busBlack} alt="Bus" className="w-8 h-8 -mt-8 ms-16" /></p>
                                        <p className="-mt-1 text-sm">Antananarivo</p>
                                    </div>

                                    <div className="relative">
                                        <img src={line} alt="Ligne" className="mt-2" />
                                        <p className="absolute top-3 left-12 p-1 bg-white text-sm">14h</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-end ms-12">Mar 30</p>
                                        <p className="-mt-1 text-lg font-bold text-end">07:00 <img src={bus} alt="Bus" className="w-8 h-8 -mt-8 ms-2" /></p>
                                        <p className="-mt-1 text-sm text-end ms-4">Mahajanga</p>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between mt-10">
                                    <p className=" text-sm"><i className="pi pi-car me-3"></i>TAF 3456</p>
                                    <Button label="Détail" className="text-sm border-none outline-none font-poppins h-8 me-12 -mt-2" />
                                </div>
                            </div>
                        </div>

                    </section>

                    <Paginator first={first} rows={rows} totalRecords={120} className="font-poppins mt-8" />
                </div>
            </main>

        </motion.div >
    )
}

export default ListTrip
