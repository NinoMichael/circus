import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { Link } from "react-router-dom"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

import sprinter from "../../images/assets/sprinter.png"
import busBlack from "../../images/icons/bus-black.png"
import bus from "../../images/icons/bus.png"
import line from "../../images/icons/line.png"

const TripCoop = () => {
    const { t } = useLanguage()

    const plannings = [
        {
            imgTransport: sprinter,
            matricule: "TAF 3456",
            restPlaces: 4,
            villeDepart: "Antananarivo",
            jourDepart: "Lun 29",
            heureDepart: "17:00",
            villeArrivee: "Mahajanga",
            jourArrivee: "Mar 30",
            heureArrivee: "07:00",
            duree: 14
        },
        {
            imgTransport: sprinter,
            matricule: "TAF 3456",
            restPlaces: 4,
            villeDepart: "Antananarivo",
            jourDepart: "Lun 29",
            heureDepart: "17:00",
            villeArrivee: "Mahajanga",
            jourArrivee: "Mar 30",
            heureArrivee: "07:00",
            duree: 14
        },
        {
            imgTransport: sprinter,
            matricule: "TAF 3456",
            restPlaces: 4,
            villeDepart: "Antananarivo",
            jourDepart: "Lun 29",
            heureDepart: "17:00",
            villeArrivee: "Mahajanga",
            jourArrivee: "Mar 30",
            heureArrivee: "07:00",
            duree: 14
        }
    ]

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-4">
                    <div className="flex justify-between pt-20 ps-6 pe-6">
                        <h1 className="text-xl font-semibold">Liste des voyages</h1>

                        <div className="flex justify-start">
                            <Link to="/list-book"><Button label="Liste des réservations" className="font-poppins text-sm border border-none outline outline-none bg-slate-900 text-white" icon="pi pi-list" /></Link>
                            <Link to="/add-driver"><Button label="Ajouter un planning" className="font-poppins text-sm ms-3" icon="pi pi-plus" /></Link>
                            <i className="pi pi-info-circle ms-4 mt-3 cursor-pointer" title="Voir information"></i>
                        </div>
                    </div>

                    <div className="flex justify-between mt-10 me-6">
                        <div className="ms-6 space-x-6 flex flex-row justify-start">
                            <i className="pi pi-sort-amount-up cursor-pointer"></i>
                            <i className="pi pi-sort-amount-down cursor-pointer"></i>
                            <h4 className="text-lg font-kanit ms-10 -mt-2">03 planning</h4>
                        </div>

                        <i className="pi pi-filter cursor-pointer"></i>
                    </div>

                    <Divider className="w-[95%] ms-6" />

                    <section className="ms-6 grid grid-cols-2 gap-y-3 mt-6">
                        {plannings.map((planning, index) => (
                            <div key={index} className="bg-white border rounded flex flex-row p-4 divide-x w-[32.5rem]">
                                <div className="px-6">
                                    <div className="mt-8 w-24" >
                                        <img src={planning.imgTransport} alt="Bus" className="w-full h-24 rounded" />
                                    </div>
                                </div>

                                <div className="px-6">
                                    <div className="flex flex-row">
                                        <Button label="Carte" className="bg-slate-900 text-[0.7em] text-white rounded border-none outline-none font-poppins h-6 cursor-pointer" icon="pi pi-map-marker" />
                                        <p className="text-xs mt-1 ms-3"> - <span className="ms-2">{planning.restPlaces} places restants</span></p>

                                        <Button icon="pi pi-ellipsis-v" className="bg-transparent border border-none outline outline-none ms-12 cursor-pointer" />
                                    </div>

                                    <div className="mt-8 flex flex-row w-[22rem]">
                                        <div>
                                            <p className="text-xs">{planning.jourDepart}</p>
                                            <p className="-mt-1 text-lg font-bold">{planning.heureDepart} <img src={busBlack} alt="Bus" className="w-8 h-8 -mt-8 ms-16" /></p>
                                            <p className="-mt-1 text-sm">{planning.villeDepart}</p>
                                        </div>

                                        <div className="relative">
                                            <img src={line} alt="Ligne" className="mt-2" />
                                            <p className="absolute top-3 left-12 p-1 bg-white text-sm">{planning.duree}h</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-end ms-12">{planning.jourArrivee}</p>
                                            <p className="-mt-1 text-lg font-bold text-end">{planning.heureArrivee} <img src={bus} alt="Bus" className="w-8 h-8 -mt-8 ms-2" /></p>
                                            <p className="-mt-1 text-sm text-end ms-4">{planning.villeArrivee}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row justify-between mt-10">
                                        <p className=" text-sm"><i className="pi pi-car me-3"></i>{planning.matricule}</p>
                                        <Button label="Détail" className="text-sm border-none outline-none font-poppins h-8 me-12 -mt-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
            </motion.div>
        </>
    )
}

export default TripCoop
