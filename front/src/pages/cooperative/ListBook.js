import React, { useState } from "react"
import { motion } from "framer-motion"
import Dashmenu from "../../components/inc/Dashmenu"
import DashHeader from "../../components/inc/DashHeader"
import { DataTable } from "primereact/datatable"
import { Avatar } from "primereact/avatar"
import { Column } from "primereact/column"

const ListBook = () => {
    const books = [
        {
            id: 1,
            user: "Tantely",
            date: "10-10-2024",
            bus: 'TAF 2233',
            bookers: '1',
            payment: 'Mvola',
            amount: '105 000 MGA',
        },
        {
            id: 2,
            user: "Tantely",
            date: "10-10-2024",
            bus: 'TAF 2233',
            bookers: '1',
            payment: 'Mvola',
            amount: '105 000 MGA',
        },
        {
            id: 3,
            user: "Tantely",
            date: "10-10-2024",
            bus: 'TAF 2233',
            bookers: '1',
            payment: 'Mvola',
            amount: '105 000 MGA',
        },
        {
            id: 4,
            user: "Tantely",
            date: "10-10-2024",
            bus: 'TAF 2233',
            bookers: '1',
            payment: 'Mvola',
            amount: '105 000 MGA',
        }
    ]

    const userTemplate = (rowData) => {
        return (
            <div>
                <Avatar label={rowData.user.charAt(0)} shape="circle" className="mr-2 -ms-3" />
                <span>{rowData.user}</span>
            </div>
        )
    }

    const actionTemplate = (rowData) => {
        return (
            <i className="pi pi-info-circle cursor-pointer" title="Détail"></i>
        )
    }


    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-4">
                    <div className="flex justify-between pt-20 ps-6 pe-6">
                        <h1 className="text-xl font-semibold font-poppins">Liste des réservations</h1>
                        <i className="pi pi-filter"></i>
                    </div>

                    <section className="mt-8 mx-6">
                        <DataTable value={books} paginator rows={10}>
                            <Column field="id" header="ID" sortable className="font-poppins text-sm"></Column>
                            <Column field="user" header="Nom" sortable className="font-poppins text-sm" body={userTemplate}></Column>
                            <Column field="date" header="Date" sortable className="font-poppins text-sm"></Column>
                            <Column field="bus" header="Bus" sortable className="font-poppins text-sm"></Column>
                            <Column field="bookers" header="Réservant" sortable className="font-poppins text-sm text-center"></Column>
                            <Column field="payment" header="Paiement" sortable className="font-poppins text-sm"></Column>
                            <Column field="amount" header="Montant" sortable className="font-poppins text-sm"></Column>
                            <Column header="Action" className="font-poppins text-sm ps-6" body={actionTemplate}></Column>
                        </DataTable>
                    </section>
                </main>
            </motion.div>
        </>
    )
}

export default ListBook
