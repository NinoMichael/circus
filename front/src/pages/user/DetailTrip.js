import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { motion } from 'framer-motion'
import NavigationMenu from '../../components/inc/NavigationMenu'
import InputNombreReservants from '../../components/InputNbreReservants'
import InputNomReservants from '../../components/InputNomReservants'
import SelectionPlace from '../../components/SelectionPlace'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

import sprinter from "../../images/assets/sprinter.png"
import besady from '../../images/assets/besady.jpg'
import MapWithRoute from '../../components/Map'
import line2 from '../../images/icons/line2.png'
import busBlack from '../../images/icons/bus-black.png'
import bus from '../../images/icons/bus.png'
import logo from '../../images/logo/logo-black.png'
import airtel from "../../images/assets/airtel.png"
import mvola from "../../images/assets/mvola.png"
import orange from "../../images/assets/orange.png"
import especes from "../../images/assets/wallet.png"
import SelectionPayment from '../../components/SelectionPayment'
import SummaryDialog from '../../components/inc/SummaryDialog'

const DetailTrip = () => {
    const { t } = useLanguage()
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [loading4, setLoading4] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [nbreReservant, setNbreReservant] = useState()
    const [champsReservant, setChampsReservant] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(false)
    const [summary, setSummary] = useState(false)
    const [nomReservant, setNomReservant] = useState([])
    const [checked, setChecked] = useState(false)
    const [place, setPlace] = useState(false)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [vehicleCapacity, setVehicleCapacity] = useState(20)

    const load = (e) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            e.preventDefault()
            const nbre = parseInt(nbreReservant)
            if (nbre > 0) {
                setNomReservant(Array(nbre).fill(''))
                setChampsReservant(true)
            }
        }, 1500)
    }

    const load1 = (e) => {
        setLoading1(true)
        setTimeout(() => {
            setLoading1(false)
            e.preventDefault()
            setPlace(true)
        }, 1500)
    }

    const paymentDatas = [
        {
            id: 1,
            intitule: "Mvola",
            img: mvola
        },
        {
            id: 2,
            intitule: "Orange Money",
            img: orange
        },
        {
            id: 3,
            intitule: "Airtel Money",
            img: airtel
        },
        {
            id: 4,
            intitule: "Espèces",
            img: especes
        },
    ]

    const load2 = (e) => {
        setLoading2(true)
        setTimeout(() => {
            setLoading2(false)
            e.preventDefault()
            setPaymentMethod(true)
        }, 1500)
    }

    const load3 = (e) => {
        setLoading3(true)
        setTimeout(() => {
            setLoading3(false)
            e.preventDefault()
            setSummary(true)
        }, 1500)
    }

    const load4 = (e) => {
        setLoading4(true)
        setTimeout(() => {
            setLoading4(false)
            e.preventDefault()
            setSummary(true)
        }, 1500)
    }

    const handleChangeNom = (index, value) => {
        const updatedNoms = [...nomReservant]
        updatedNoms[index] = value
        setNomReservant(updatedNoms)
    }

    const hideDialog = () => {
        setChampsReservant(false)
        setNbreReservant()
        setNomReservant([])
        setLoading(false)
        setLoading(false)
        setPaymentMethod(false)
        setSummary(false)
        setSelectedSeats(false)
        setPlace(false)
        setVisibleDialog(false)
    }

    const generateSeats = (capacity) => {
        const rows = []
        const seatsPerRow = 4
        const totalRows = Math.ceil(capacity / seatsPerRow)
        let seatNumber = 1

        for (let row = 0; row < totalRows; row++) {
            const rowSeats = [];
            for (let col = 0; col < seatsPerRow; col++) {
                if (seatNumber <= capacity) {
                    const seatLabel = `${Math.ceil(seatNumber / seatsPerRow)}${String.fromCharCode(64 + col + 1)}`
                    rowSeats.push(seatLabel)
                    seatNumber++;
                }
            }
            rows.push(rowSeats)
        }
        return rows
    };

    const seatRows = generateSeats(vehicleCapacity);

    const availableSeats = []
    const reservedSeats = []

    const handleSeatClick = (seat, e) => {
        e.preventDefault()
        if (!reservedSeats.includes(seat)) {
            if (selectedSeats.includes(seat)) {
                setSelectedSeats(selectedSeats.filter((s) => s !== seat))
            } else {
                setSelectedSeats([...selectedSeats, seat])
            }
        }
    }

    const tripDatas = [
        {
            id: 1,
            cooperative: "Besady",
            place: 4,
            jourDepart: "Dim 29",
            jourArrivee: "Lun 30",
            villeDepart: "Ant",
            villeArrivee: "Maha",
            heureDepart: "17:00",
            heureArrivee: "07:00",
            matricule: "TAF 3456",
            imgTransport: besady
        },
        {
            id: 1,
            cooperative: "Besady",
            place: 4,
            jourDepart: "Dim 29",
            jourArrivee: "Lun 30",
            villeDepart: "Ant",
            villeArrivee: "Maha",
            heureDepart: "17:00",
            heureArrivee: "07:00",
            matricule: "TAF 3456",
            imgTransport: besady
        }
    ]

    const headerForm = () => (
        <div className="flex flex-row">
            <img src={logo} alt="Logo" className="w-16 h-12" />
        </div>
    )

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header>
                <NavigationMenu className="custom-bg-main pb-[3vh]" />
            </header>

            <main className="flex flex-row mt-8 mx-12">
                <div className="w-[22%] bg-white shadow-lg rounded h-[68vh] overflow-scroll">
                    <div className="bg-slate-900 rounded-t-lg h-12 p-3">
                        <h3 className="text-sm text-white text-center">Suggestions pour vous</h3>
                    </div>

                    <section className="flex flex-col">
                        {tripDatas.map((tripData) => (
                            <div className="bg-white border rounded p-4 mx-3 mt-4 cursor-pointer">
                                <div className="flex flex-row">
                                    <Avatar image={tripData.imgTransport} alt="Transport" className='w-8 h-8' shape='circle' />
                                    <h3 className="text-[0.7em] ms-2 font-kanit">{tripData.cooperative} <span className="font-poppins"> - {tripData.place} places restants</span></h3>
                                </div>

                                <div className="flex flex-row mt-3">
                                    <div>
                                        <p className="text-[0.7em]">{tripData.jourDepart}</p>
                                        <p className="text-[0.8em] font-semibold -mt-2">{tripData.villeDepart}</p>
                                        <p className="text-[0.7em] -mt-2">{tripData.heureDepart}</p>
                                    </div>

                                    <div className="ms-3 flex flex-row mt-1">
                                        <img src={bus} alt="Bus" className="w-4 h-4 mt-4" />
                                        <img src={line2} alt="Ligne" />
                                        <img src={busBlack} alt="Bus" className="w-4 h-4 mt-4 ms-2" />
                                    </div>

                                    <div className="ms-3">
                                        <p className="text-[0.7em] text-end">{tripData.jourArrivee}</p>
                                        <p className="text-[0.8em] font-semibold -mt-2 text-end">{tripData.villeArrivee}</p>
                                        <p className="text-[0.7em] -mt-2 text-end">{tripData.heureArrivee}</p>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between mt-4">
                                    <p className="text-xs"><i className="pi pi-car text-xs me-2"></i>TAF 3456</p>
                                    <Button icon="pi pi-map-marker" className="bg-amber-400 border border-none outline-none text-xs py-1 px-3 -mt-1" title="Voir carte" />
                                </div>
                            </div>
                        ))}

                    </section>
                </div>

                <div className="w-[50%] mx-8">
                    <h2 className="text-2xl font-kanit">Informations détaillées</h2>
                    <div className="flex flex-row space-x-8 mt-4">
                        <div>
                            <img src={sprinter} alt="Transport" className="w-80 h-64 rounded" />
                        </div>

                        <div>
                            <div className="flex flex-row">
                                <Avatar image={besady} shape="circle" />
                                <p className="mt-2 ms-3 font-kanit">Besady</p>
                            </div>

                            <section className="mt-4">
                                <div className="grid grid-cols-2">
                                    <div>
                                        <p className="text-xs text-slate-400">Départ</p>
                                        <p className="text-sm">Antananarivo</p>
                                        <p className="text-sm -mt-1">Gare Maki Andohatapenaka</p>
                                        <p className="text-sm -mt-1">Ven 29 Sept, 17:00</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Arrivée</p>
                                        <p className="text-sm">Mahajanga</p>
                                        <p className="text-sm -mt-1">Gare Aranta Marovato</p>
                                        <p className="text-sm -mt-1">Sam 30 Sept, 07:00</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-6">
                                    <div>
                                        <p className="text-xs text-slate-400">Transport</p>
                                        <p className="text-sm">TAF 3456</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Places disponibles</p>
                                        <p className="text-sm">24</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-6">
                                    <div>
                                        <p className="text-xs text-slate-400">Chauffeur</p>
                                        <p className="text-sm">Tantely Ny Aina</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Tarif</p>
                                        <p className="text-sm">60 000 MGA</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className='text-xs'><i className="pi pi-info-circle me-2"></i>
                            Tout passager est invité à arriver au terminal au moins une heure avant le départ pour donner le temps de déposition des bagages et au procédure de validation de l'enregistrement
                        </p>
                    </div>

                    <Button label="Effectuer une réservation" className='mt-8 border border-none outline outline-none font-poppins flex justify-center items-center mx-auto text-sm px-24' onClick={() => setVisibleDialog(true)} />
                    <Dialog visible={visibleDialog} modal header={headerForm} style={{ width: "50vw", height: "28rem" }}
                        onHide={() => { if (!visibleDialog) return; hideDialog() }}>
                        <form className="pb-6">
                            {!champsReservant && !place && !paymentMethod && !summary ? (
                                <InputNombreReservants nbreReservant={nbreReservant} setNbreReservant={setNbreReservant} load={load} loading={loading} />
                            ) : !place && !paymentMethod && !summary ? (
                                <InputNomReservants nomReservant={nomReservant} handleChangeNom={handleChangeNom} checked={checked} setChecked={setChecked} load1={load1} loading1={loading1} />
                            ) : !paymentMethod && !summary ? (
                                <SelectionPlace seatRows={seatRows} reservedSeats={reservedSeats} selectedSeats={selectedSeats} handleSeatClick={handleSeatClick} load2={load2} loading2={loading2} />
                            ) : !summary ? (
                                <SelectionPayment paymentDatas={paymentDatas} load3={load3} loading3={loading3} />
                            ) : (
                                <SummaryDialog load4={load4} loading4={loading4} />
                            )}

                        </form>
                    </Dialog>
                </div>

                <div className="bg-white p-2 rounded w-[23%] shadow">
                    <MapWithRoute />
                </div>
            </main >
        </motion.div >
    )

}

export default DetailTrip