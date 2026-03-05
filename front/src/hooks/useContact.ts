import { useState } from 'react';
import { useApi } from './useApi';
import type { ContactResponse } from '../services/ContactService';
import type { Toast } from 'primereact/toast';
import type { RefObject } from 'react';

export const useContact = (toast: RefObject<Toast>) => {
    const { request, loading, error } = useApi<ContactResponse>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await request('post', '/contact', { name, email, subject, message });

        if (result) {
            toast?.current?.show({
                severity: 'success',
                summary: 'Succès',
                detail: result.message,
                life: 3000,
            });
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } else {
            toast?.current?.show({
                severity: 'error',
                summary: 'Erreur',
                detail: error ?? 'Une erreur est survenue.',
                life: 3000,
            });
        }
    };

    return { loading, name, email, subject, message, setName, setEmail, setSubject, setMessage, handleSubmit };
};