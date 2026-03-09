import { useState } from "react";
import { useApi } from "./useApi";
import type { ContactResponse } from "../services/ContactService";

type ToastType = "success" | "error" | "info" | "warning";

export const useContact = (showToast: (type: ToastType, message: string) => void) => {
    const { request, loading, error } = useApi<ContactResponse>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await request("post", "/contact", { name, email, subject, message });

        if (result) {
            showToast("success", result.message);

            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } else {
            if (error) {
                error.forEach((errMsg, index) => {
                    setTimeout(() => {
                        showToast("error", errMsg);
                    }, index * 3000);
                });
            }
        }
    };

    return { loading, name, email, subject, message, setName, setEmail, setSubject, setMessage, handleSubmit };
};