
/*
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ORContext = createContext(null);

export const OrphangeContext = (props) => {
    const { token } = useParams();
    const [Relavantorphange, Setorphange] = useState(null); // Initialize state as null

    useEffect(() => {
        const fetchOrphanage = async () => {
            try {
                const response = await fetch(`http://localhost:1010/getorphanage/${token}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orphanage');
                }
                const data = await response.json();
                Setorphange(data.ORData);
            } catch (error) {
                console.error('Error fetching orphanage:', error);
                toast.error('Error fetching orphanage');
            }
        };
        fetchOrphanage();
    }, [token]);

    // Add a conditional check before accessing Oname
    if (Relavantorphange) {
        console.log("new" + Relavantorphange.Oname);
    }

    return (
        <ORContext.Provider value={Relavantorphange}>
            {props.children}
        </ORContext.Provider>
    );
}
*/
