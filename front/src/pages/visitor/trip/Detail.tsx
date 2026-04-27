import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../../../lib/utils/animation";
import { useTrip } from "../../../hooks/useTrip";
import { formatDateLong, formatTime } from "../../../lib/utils/date";
import { formatCurrency } from "../../../lib/helpers";
import { formatBusType } from "../../../lib/utils/formatter";
import { getImageUrl } from "../../../lib/utils/media";
import { createTripMap } from "../../../lib/helpers/map";
import type { Trip } from "../../../lib/types/trip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import StarIcon from "@mui/icons-material/StarBorderOutlined";
import MailIcon from "@mui/icons-material/MailOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRightAltOutlined";
import BusIcon from "@mui/icons-material/DirectionsBusOutlined";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import FlagIcon from "@mui/icons-material/FlagOutlined";
import RouteIcon from "@mui/icons-material/RouteOutlined";
import IconButton from "@mui/material/IconButton";

const DetailTripVisitor = () => {
    const navigateTo = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { loading, error, fetchPublicTripById } = useTrip();
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<ReturnType<typeof createTripMap> | null>(
        null,
    );

    const [trip, setTrip] = useState<Trip | null>(null);
    const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

    const handleGoBack = () => {
        navigateTo("/trips");
    };

    useEffect(() => {
        if (id) {
            loadTrip();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (trip && mapRef.current) {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setTarget("");
            }

            const departureStation = trip.route?.departure_station;
            const arrivalStation = trip.route?.arrival_station;

            if (
                departureStation?.latitude &&
                departureStation?.longitude &&
                arrivalStation?.latitude &&
                arrivalStation?.longitude
            ) {
                mapInstanceRef.current = createTripMap("map", {
                    departure: {
                        longitude: Number(departureStation.longitude),
                        latitude: Number(departureStation.latitude),
                    },
                    arrival: {
                        longitude: Number(arrivalStation.longitude),
                        latitude: Number(arrivalStation.latitude),
                    },
                });
            }
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setTarget("");
                mapInstanceRef.current = null;
            }
        };
    }, [trip]);

    const loadTrip = async () => {
        if (!id) return;
        const data = await fetchPublicTripById(Number(id));
        if (data) {
            setTrip(data);
        }
    };

    const handleImageError = (key: string) => {
        setImgErrors((prev) => ({ ...prev, [key]: true }));
    };

    const getImageSrc = (
        path: string | null | undefined,
        key: string,
    ): string | undefined => {
        if (imgErrors[key] || !path) return undefined;
        const url = getImageUrl(path);
        return url || undefined;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress sx={{ color: "#FFCC00" }} />
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="w-full pt-2 pb-16 md:py-8 px-4 md:px-8 lg:px-16">
                <div className="flex justify-center items-center h-64 text-gray-500">
                    <p>{error || "Trajet introuvable"}</p>
                </div>
            </div>
        );
    }

    const departureStation = trip.route?.departure_station;
    const arrivalStation = trip.route?.arrival_station;

    return (
        <motion.div
            className="w-full pt-2 pb-16 md:py-8 px-4 md:px-8 lg:px-16"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.35 }}
        >
            <IconButton onClick={handleGoBack} className="mt-4">
                <ArrowBackIcon />
            </IconButton>

            <div className="mt-8 rounded-lg relative">
                <div className="relative">
                    <img
                        className="h-80 rounded-xl w-full object-cover"
                        src={getImageSrc(
                            departureStation?.image_cover,
                            "station",
                        )}
                        onError={() => handleImageError("station")}
                        alt={`Station ${departureStation?.name || ""}`}
                    />
                    {!getImageSrc(departureStation?.image_cover, "station") && (
                        <div className="absolute inset-0 h-80 rounded-xl bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center">
                            <div className="text-center text-white">
                                <LocationIcon className="size-16 mb-2 opacity-50" />
                                <p className="text-lg font-bold opacity-75">
                                    {departureStation?.city || "Madagascar"}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-black/5 rounded-b-xl"></div>
                </div>

                <div className="absolute left-8 bottom-8 text-white space-y-4">
                    <h5 className="font-light">Trajets nationaux</h5>
                    <p className="text-xl sm:text-3xl font-bold">
                        <span className="mr-2">
                            {departureStation?.city || "Départ"}
                        </span>
                        <span className="text-primary text-3xl sm:text-5xl">
                            →
                        </span>
                        <span className="ml-2">
                            {arrivalStation?.city || "Arrivée"}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mt-8 flex flex-col lg:flex-row w-full gap-8">
                <div className="lg:w-4/6 grid grid-cols-1 gap-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div className="space-y-2">
                                <h2 className="font-bold text-2xl">
                                    Détails du trajet
                                </h2>
                                <p>Référence trajet : #{trip.id}</p>
                            </div>
                            <div className="sm:text-end">
                                <h5 className="font-bold uppercase tracking-widest opacity-80">
                                    tarif
                                </h5>
                                <p className="text-2xl font-bold text-primary">
                                    {formatCurrency(Number(trip.fees))}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 relative">
                            <div className="absolute left-[27px] sm:left-[59px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary rounded-full"></div>

                            <div className="relative flex gap-8 sm:gap-16 items-start mb-8">
                                <div className="relative z-10 flex-shrink-0 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                    <LocationIcon className="text-white size-6" />
                                </div>
                                <div className="flex-1 pt-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                        <div className="bg-primary/10 px-4 py-2 rounded-lg">
                                            <span className="text-2xl font-bold text-primary">
                                                {formatTime(
                                                    trip.departure_time,
                                                )}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <h6 className="font-bold text-xl text-gray-800">
                                                {departureStation?.city || "-"}
                                            </h6>
                                            <p className="text-gray-500 text-sm">
                                                {departureStation?.name ||
                                                    "Gare de départ"}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400">
                                        {formatDateLong(trip.departure_time)}
                                    </p>
                                </div>
                            </div>

                            <div className="ml-16 sm:ml-28 mb-8">
                                <div className="font-medium rounded-full px-6 py-3 text-sm bg-gray-100 w-fit flex items-center gap-3">
                                    <span>
                                        Durée estimée:{" "}
                                        <strong>
                                            {trip.route?.estimated_duration ||
                                                "8h"}
                                        </strong>
                                    </span>
                                </div>
                            </div>

                            <div className="relative flex gap-8 sm:gap-16 items-start">
                                <div className="relative z-10 flex-shrink-0 w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                                    <FlagIcon className="text-white size-6" />
                                </div>
                                <div className="flex-1 pt-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                        <div className="bg-secondary px-4 py-2 rounded-lg">
                                            <span className="text-2xl font-bold text-white">
                                                {formatTime(trip.arrival_time)}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <h6 className="font-bold text-xl text-gray-800">
                                                {arrivalStation?.city || "-"}
                                            </h6>
                                            <p className="text-gray-500 text-sm">
                                                {arrivalStation?.name ||
                                                    "Gare d'arrivée"}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400">
                                        {formatDateLong(trip.arrival_time)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-primary text-2xl font-bold">
                            <BusIcon className="size-7 mr-2" />
                            <span>Taxi-brousse & chauffeur</span>
                        </h2>
                        <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <img
                                    src={getImageSrc(
                                        trip.buse?.cover_image_path,
                                        "bus",
                                    )}
                                    onError={() => handleImageError("bus")}
                                    className="h-48 rounded-lg w-full object-cover bg-gray-200"
                                    alt={`Bus ${trip.buse?.registration_number || ""}`}
                                />
                                {!getImageSrc(
                                    trip.buse?.cover_image_path,
                                    "bus",
                                ) && (
                                    <div className="h-48 rounded-lg bg-gray-200 flex items-center justify-center">
                                        <BusIcon className="size-12 text-gray-400" />
                                    </div>
                                )}
                                <p className="bg-gray-200 opacity-90 font-medium text-sm w-fit px-6 py-2 rounded-full">
                                    {trip.available_seats} places disponibles
                                </p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={getImageSrc(
                                            trip.buse?.driver?.avatar,
                                            "driver",
                                        )}
                                        onError={() =>
                                            handleImageError("driver")
                                        }
                                        className="w-16 h-16 border-2 border-primary rounded-full bg-gray-200"
                                        alt={`Chauffeur ${trip.buse?.driver?.firstname || ""}`}
                                    />
                                    <div className="space-y-1">
                                        <h6 className="text-xs font-light">
                                            Chauffeur
                                        </h6>
                                        <p className="font-bold text-lg">
                                            {trip.buse?.driver?.firstname &&
                                            trip.buse?.driver?.lastname
                                                ? `${trip.buse.driver.firstname} ${trip.buse.driver.lastname}`
                                                : "Non assigné"}
                                        </p>
                                        {trip.buse?.driver?.phone && (
                                            <p className="text-primary text-sm font-semibold">
                                                {trip.buse.driver.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="pb-2 border-b border-gray-300 flex items-center justify-between gap-4">
                                        <h6>Type</h6>
                                        <p className="font-bold capitalize">
                                            {trip.buse?.type
                                                ? formatBusType[trip.buse.type]
                                                : "-"}
                                        </p>
                                    </div>
                                    <div className="pb-2 border-b border-gray-300 flex items-center justify-between gap-4">
                                        <h6>Matricule</h6>
                                        <p className="font-bold uppercase">
                                            {trip.buse?.registration_number ||
                                                "-"}
                                        </p>
                                    </div>
                                    <div className="pb-2 border-b border-gray-300 flex items-center justify-between gap-4">
                                        <h6>Capacité</h6>
                                        <p className="font-bold">
                                            {trip.buse?.capacity || "-"} places
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-primary text-2xl font-bold">
                            <RouteIcon className="size-7 mr-2" />
                            <span>Itinéraire</span>
                        </h2>
                        <div className="mt-8 flex flex-col md:flex-row gap-12 md:items-center">
                            <div className="flex gap-2 items-center">
                                <LocationIcon className="bg-primary/30 p-3 size-12 text-primary rounded-lg mr-3" />
                                <div>
                                    <h6 className="opacity-70 uppercase tracking-wider text-sm font-bold">
                                        départ
                                    </h6>
                                    <p>{departureStation?.name || "Gare"}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FlagIcon className="bg-gray-200 p-3 size-12 rounded-lg mr-3" />
                                <div>
                                    <h6 className="opacity-70 uppercase tracking-wider text-sm font-bold">
                                        arrivée
                                    </h6>
                                    <p>{arrivalStation?.name || "Gare"}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="h-80 mt-8 rounded-lg"
                            id="map"
                            ref={mapRef}
                        />
                    </div>
                </div>

                <div className="lg:w-2/6 h-full grid grid-cols-1 gap-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <img
                                src={getImageSrc(
                                    trip.cooperative?.logo,
                                    "cooperative",
                                )}
                                onError={() => handleImageError("cooperative")}
                                className="w-20 h-20 rounded-lg"
                                alt={`Logo ${trip.cooperative?.name || ""}`}
                            />
                            <h3 className="font-bold text-xl">
                                {trip.cooperative?.name || "Coopérative"}
                            </h3>
                            <div className="flex justify-center gap-2">
                                <StarIcon className="size-6 text-primary" />
                                <StarIcon className="size-6 text-primary" />
                                <StarIcon className="size-6 text-primary" />
                                <StarIcon className="size-6 text-primary" />
                                <StarIcon className="size-6 text-primary" />
                            </div>
                        </div>
                        <div className="mt-10 space-y-4">
                            {trip.cooperative?.contact_email && (
                                <p>
                                    <MailIcon className="size-6 mr-3 text-gray-400" />
                                    <span>
                                        {trip.cooperative.contact_email}
                                    </span>
                                </p>
                            )}
                            {trip.cooperative?.contact_phone && (
                                <p>
                                    <PhoneIcon className="size-6 mr-3 text-gray-400" />
                                    <span>
                                        {trip.cooperative.contact_phone}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className="mt-10 space-y-4">
                            <h3 className="font-bold tracking-widest uppercase text-sm">
                                avis clients
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-gray-100 p-4 rounded-lg space-y-2 cursor-pointer hover:scale-105 hover:transition-all hover:duration-300">
                                    <div className="flex gap-3 items-center">
                                        <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-sm font-bold">
                                                S.A
                                            </span>
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <h6 className="font-semibold">
                                                Sarah A.
                                            </h6>
                                            <div className="flex gap-1 items-center">
                                                <StarIcon className="size-3 text-primary" />
                                                <StarIcon className="size-3 text-primary" />
                                                <StarIcon className="size-3 text-primary" />
                                                <StarIcon className="size-3 text-primary" />
                                                <StarIcon className="size-3 text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="opacity-70 text-sm">
                                        "Voyage très confortable, sièges
                                        spacieux et chauffeur ponctuel. Je
                                        recommande vivement !"
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/"
                                className="mt-6 flex text-sm justify-end text-primary font-bold"
                            >
                                <ArrowRightIcon className="mr-2 size-5" />
                                <span>Voir tout</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="uppercase text-sm tracking-widest font-bold">
                            actions
                        </h3>
                        <Button
                            className="mt-8 bg-primary w-full font-bold"
                            startIcon={<ArrowRightIcon />}
                        >
                            Réserver
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DetailTripVisitor;
