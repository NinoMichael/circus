import React from "react"
import { motion } from "framer-motion"
import DashHeader from "../../components/inc/DashHeader"
import Dashmenu from "../../components/inc/Dashmenu"
import { Button } from "primereact/button"
import { Avatar } from "primereact/avatar"
import { Divider } from "primereact/divider"
import { InputText } from "primereact/inputtext"
import { Link } from "react-router-dom"

import besady from "../../images/assets/besady.jpg"
import accountSetting from "../../images/assets/account-setting.png"

const InfoCoop = () => {
    const contacts = [
        {
            id: 1,
            numero: "+261 32 45 678 90"
        },
        {
            id: 2,
            numero: "+261 32 45 678 90"
        },
        {
            id: 3,
            numero: "+261 32 45 678 90"
        }
    ]

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="pt-20 px-6 mt-2">
                    <div className="flex flex-row justify-between ">
                        <h2 className="font-kanit text-xl">Informations de la coopérative</h2>
                        <Button icon="pi pi-pen-to-square" label="Editer" className="font-poppins text-sm border border-none outline outline-none px-4 py-2" />
                    </div>

                    <div className="mt-4 flex flex-row justify-between space-x-12">
                        <div className="mt-2 w-full flex flex-col justify-center items-center mx-auto">
                            <img src={accountSetting} alt="Information" className="w-96 h-80" />
                            <p className="text-sm font-poppins mt-6">Visualisez dans l'ensemble les informations détaillées de votre coopérative. A noter que la modification des données requiert l'autorisation des régulateurs des coopératives, sous la direction et la permission des compagnies de transport terrestre.</p>
                        </div>

                        <div className="w-full">
                            <Avatar image={besady} size="xlarge" shape="circle" />

                            <div className="grid grid-cols-2 w-80 mt-4">
                                <h4 className="text-slate-400 font-poppins text-sm">Nom</h4>
                                <p className="font-poppins text-sm -mt-1">Trans Besady</p>
                            </div>
                            <div className="grid grid-cols-2 w-80 mt-2">
                                <h4 className="text-slate-400 font-poppins text-sm">Date de création</h4>
                                <p className="font-poppins text-sm -mt-1">12 Mars 2024 - 16:03</p>
                            </div>

                            <Divider className="mt-4 mb-3 me-12" />

                            <div className="mt-4">
                                <div className="flex flex-row justify-between">
                                    <h4 className="font-kanit text-lg">Contact</h4>
                                    <Button icon="pi pi-plus" label="Ajouter" className="font-poppins text-sm bg-slate-900 border text-white border-none outline outline-none py-1 px-4" />
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
                                    {contacts.map((contact) => (
                                        <InputText key={contact.id} value={contact.numero} className="font-poppins w-[15rem] text-sm" />
                                    ))}
                                </div>

                                <Link>
                                    <p className="mt-16 text-red-700 text-xs font-poppins"><i className="pi pi-shield me-3"></i>Changer les mots de passe d'accès</p>
                                </Link>

                                <Link>
                                    <p className="mt-4 text-xs font-poppins"><i className="pi pi-phone me-3"></i>Contacter le support</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main >
            </motion.div >
        </>
    )
}

export default InfoCoop