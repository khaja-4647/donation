import { useState, useEffect } from "react";

const Gps = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [userAddress, setUserAddrss] = useState("");

    useEffect(() => {
        const geo = navigator.geolocation;
        if (geo) {
            geo.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        }
    }, []); // Runs only once on component mount

    const getUserAddress = async () => {
        const url = `https://api.opencagedata.com/geocode/v1/json?key=2b8774f85e0441299700df5bcc98e006&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
        
        try {
            const loc = await fetch(url);
            const data = await loc.json();
            setUserAddrss(data.results[0].formatted);
            } catch (error) {
                console.error("Error fetching user address:", error);
            }
        };
        
    return (
        <>
            <h1>Current Location</h1>
            <h2>Latitude: {latitude}</h2>
            <h2>Longitude: {longitude}</h2>
            <h2>User Address: {userAddress}</h2>
            <button onClick={getUserAddress}>Get User Address</button>
        </>
    );
};

export default Gps;
