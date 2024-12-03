import { useState } from 'react'

const FeladatLista = () => {

    const [feladatok, setFeladatok] = useState([]);
    const [ujFeladat, setUjFeladat] = useState({ szoveg: "", kesz: false});

    const ujFeladatHozzaadasa = () => {
        setFeladatok([...feladatok, ujFeladat]);
    };

    return (
        <div className='text-center bg-gray-700 min-h-screen p-5'>
            <input className='rounded mx-2' type="text" value={ujFeladat.szoveg} onChange={(e) => setUjFeladat( {...ujFeladat, szoveg: e.target.value})} />
            <button className='rounded m-2 px-2 bg-gray-50' onClick={ujFeladatHozzaadasa}>Feladat hozzáadása</button>
            <ul>
                {feladatok.map((feladat, index) => (
                    <li className='p-3 space-y-2' key={index}>
                        {feladat.szoveg} {feladat.kesz ? "Kész" : "Nincs Kész"}
                        <input className='mx-2' value={feladat.kesz} onChange={(e) => setFeladatok(feladatok.map((f, i) => (i === index ? { ...f, kesz: e.target.checked } : f)))}type="checkbox"/>
                        <button className='rounded mx-2 px-2 bg-gray-50' onClick={() => setFeladatok(feladatok.filter((f, i) => i !== index))}>Töröl</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeladatLista