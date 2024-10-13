import React, { useState, useEffect } from "react";
import Dashmenu from "../../components/inc/Dashmenu";
import DashHeader from "../../components/inc/DashHeader";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { getTypeTransports } from "../../API/typeTransportService";
import { getChauffeurs } from "../../API/driverService";
import "../../styles/user/menu.css";
import { createTransport } from "../../API/transportService";

const AddBus = () => {
    const [nomValue, nomSetValue] = useState("");
    const [capacityValue, capacitySetValue] = useState("");
    const [selectedType, setSelectedType] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [types, setTypes] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [imgTransport, setImgTransport] = useState(null);
    const [loading, setLoading] = useState(false);

    const { t } = useLanguage();

    useEffect(() => {
        const fetchTypeTransports = async () => {
            try {
                const response = await getTypeTransports();
                const datas = response.map((typeTransport) => ({
                    id: typeTransport.id_type,
                    nom: typeTransport.intitule,
                }));
                setTypes(datas);
            } catch (error) {
                console.error("Erreur lors de la récupération des types de transport", error);
            }
        };

        fetchTypeTransports();
    }, []);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await getChauffeurs();
                const datas = response
                    .filter((driver) => driver.disponibilite)
                    .map((driver) => ({
                        id: driver.id_chauffeur,
                        nom: driver.nom_chauffeur,
                        image: driver.img,

                    }));
                setDrivers(datas);
            } catch (error) {
                console.error("Erreur lors de la récupération des chauffeurs", error);
            }
        };

        fetchDrivers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")
        setSuccessMessage("")

        if (!nomValue || !selectedType || !capacityValue || !selectedDriver) {
            setErrorMessage("Veuillez remplir tout les champs");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("matricule", nomValue)
        formData.append("typeTransport", selectedType?.id)
        formData.append("capacite", capacityValue)
        formData.append("chauffeur", selectedDriver?.id)
        formData.append("cooperative", 1);


        if (imgFile) {
            formData.append("img", imgFile);
        }

        try {
            const response = await createTransport(formData);
            setSuccessMessage("Bus ajouté");
            setLoading(false);
        } catch (error) {
            setErrorMessage("Erreur lors de l'ajout du bus");
            setLoading(false);
        }
    };

    const onUpload = (e) => {
        const file = e.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImgTransport(event.target.result);
            };
            reader.readAsDataURL(file);
            setImgFile(file);
        }
    };

    const optionTypeTemplate = (option) => {
        return (
            <div className="flex items-center">
                <p>{option.nom}</p>
            </div>
        );
    };

    const optionAssignmentTemplate = (option) => {
        return (
            <div className="flex items-center">
                {option.image ? (
                    <Avatar image={option.image} className="me-2" shape="circle" />
                ) : (
                    <Avatar label={option.nom.charAt(0)} className="me-2" shape="circle" />
                )}
                <p>{option.nom}</p>
            </div>
        );
    };

    return (
        <>
            <Dashmenu />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ps-[16.25rem] -z-50">
                <DashHeader />

                <main className="mt-3">
                    <div className="flex justify-between pt-20 ps-6 pe-6">
                        <h1 className="text-xl font-semibold">{t("addBus")}</h1>
                        <Link title="Aide">
                            <i className="pi pi-info-circle text-xl"></i>
                        </Link>
                    </div>

                    <form className="bg-white shadow-lg rounded mx-24 pb-12 mt-2" onSubmit={handleSubmit}>
                        <section className="grid grid-cols-2">
                            <div>
                                <FileUpload mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} customUpload auto uploadHandler={onUpload} className="invisible" />
                                {imgTransport ? (
                                    <div className="border border-black-300 w-64 mt-12 py-2 flex mx-auto justify-center items-center">
                                        <img src={imgTransport} alt="Transport" className="h-full" />
                                    </div>
                                ) : (
                                    <div className="border border-dashed border-black py-20 px-12 w-64 mt-12 mx-auto flex justify-center items-center">
                                        <p className="border border-dashed text-sm flex justify-center items-center m-auto cursor-pointer" onClick={() => document.querySelector('.p-fileupload-choose input').click()}>
                                            <i className="pi pi-plus me-2"></i>
                                            {t("addImage")}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="w-96 text-sm">
                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-id-card"></i>
                                    </span>
                                    <FloatLabel>
                                        <InputText value={nomValue} onChange={(e) => nomSetValue(e.target.value)} />
                                        <label htmlFor="Matricule">{t("matricule")}</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-car"></i>
                                    </span>
                                    <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types} optionLabel="nom" placeholder="Type de transport" filter
                                        itemTemplate={optionTypeTemplate} className="custom-p-dropdown font-poppins" panelClassName="text-sm font-poppins"
                                    />
                                </div>

                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-users"></i>
                                    </span>
                                    <FloatLabel>
                                        <InputText value={capacityValue} onChange={(e) => capacitySetValue(e.target.value)} />
                                        <label htmlFor="capacite">{t("capacite")}</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-inputgroup flex-1 mt-10 max-[530px]:w-80 max-[530px]:text-xs max-[410px]:w-64">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <Dropdown value={selectedDriver} onChange={(e) => setSelectedDriver(e.value)} options={drivers} optionLabel="nom" placeholder="Assign Driver" filter
                                        itemTemplate={optionAssignmentTemplate} className="custom-p-dropdown font-poppins" panelClassName="text-sm font-poppins"
                                    />
                                </div>
                            </div>
                        </section>

                        {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
                        {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}

                        <Button type="submit" label={t("validate")} className="py-2 px-48 text-black bg-amber-400 hover:bg-amber-500 border border-none outline outline-none flex justify-center items-center mx-auto mt-16 font-poppins shadow" icon="pi pi-check" loading={loading}
                        />
                    </form>
                </main>
            </motion.div>
        </>
    );
};

export default AddBus;