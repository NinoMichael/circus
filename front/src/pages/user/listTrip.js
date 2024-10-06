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
import tana from "../../images/assets/antananarivo.png"
import { Carousel } from "primereact/carousel"

const ListTrip = () => {
    const { t } = useLanguage()
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)

    const navigate = useNavigate()

    const SwitchToDetail = () => {
        navigate('/detail-trip')
    }

    const itineraires = [
        {
            villeDepart: "Antananarivo",
            villeArrivee: "Mahajanga",
            distance: "574 km",
            tarif: "60 000 MGA",
            img: tana
        },
        {
            villeDepart: "Antananarivo",
            villeArrivee: "Toamasina",
            distance: "355 km",
            tarif: "40 000 MGA",
            img: tana
        }
    ]

    const plannings = [
        {
            cooperative: "Besady",
            imgCoop: besady,
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
            cooperative: "Besady",
            imgCoop: besady,
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
            cooperative: "Besady",
            imgCoop: besady,
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

    const itineraireTemplate = (itineraire) => {
        return (
            <div className="mt-4 mx-2">
                <img src={itineraire.img} alt="Ville" className="w-full h-20" />

                <div className="flex flex-row justify-between mt-4">
                    <p className="text-xs text-slate-400 font-poppins">Départ</p>
                    <p className="text-sm font-poppins text-black">{itineraire.villeDepart}</p>
                </div>
                <div className="flex flex-row justify-between mt-1">
                    <p className="text-xs text-slate-400 font-poppins">Arrivée</p>
                    <p className="text-sm font-poppins text-black">{itineraire.villeArrivee}</p>
                </div>
                <div className="flex flex-row justify-between mt-1">
                    <p className="text-xs text-slate-400 font-poppins">Distance</p>
                    <p className="text-sm font-poppins text-black">{itineraire.distance}</p>
                </div>
                <div className="flex flex-row justify-between mt-1">
                    <p className="text-xs text-slate-400 font-poppins">Tarif</p>
                    <p className="text-sm font-poppins text-black">{itineraire.tarif}</p>
                </div>
            </div>
        )
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
                <section className="bg-white shadow-lg rounded-lg text-sm w-52 float-left max-h-[50vh] sticky top-0">
                    <div className="h-12 w-full rounded-t-lg bg-slate-900 text-white p-2">
                        <h3 className="font-kanit text-base text-center">Tarif de voyage</h3>

                        <Carousel value={itineraires} numVisible={1} circular autoplayInterval={3000} itemTemplate={itineraireTemplate} showIndicators={false} showNavigators={false} className="mt-6" />
                    </div>
                </section>

                <div>
                    <section className="ms-6 grid grid-cols-2 gap-y-3 gap-x-6">
                        {plannings.map((planning, index) => (
                            <div key={index} className="bg-white border rounded flex flex-row p-4 divide-x w-[32.5rem]">
                                <div className="px-6">
                                    <div className="flex flex-row">
                                        <Avatar image={besady} shape="circle" className="me-3" />
                                        <h3 className="mt-2 font-kanit">{planning.cooperative}</h3>
                                    </div>

                                    <div className="mt-8">
                                        <img src={planning.imgTransport} alt="Bus" className="w-72 h-24 rounded" />
                                    </div>
                                </div>

                                <div className="px-6">
                                    <div className="flex flex-row">
                                        <Button label="Carte" className="bg-slate-900 text-[0.7em] text-white rounded border-none outline-none font-poppins h-6 cursor-pointer" icon="pi pi-map-marker" />
                                        <p className="text-xs mt-1 ms-3"> - <span className="ms-2">{planning.restPlaces} places restants</span></p>
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
                                        <Button label="Détail" className="text-sm border-none outline-none font-poppins h-8 me-12 -mt-2" onClick={SwitchToDetail} />
                                    </div>
                                </div>
                            </div>

                        ))}
                    </section>

                    <Paginator first={first} rows={rows} totalRecords={120} className="font-poppins mt-8" />
                </div>
            </main>

        </motion.div >
    )
}

export default ListTrip
