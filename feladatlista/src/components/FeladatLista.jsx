import { useState, useEffect } from 'react';

const FeladatLista = () => {
    const [feladatok, setFeladatok] = useState(JSON.parse(localStorage.getItem('feladatok')));
    const [ujFeladat, setUjFeladat] = useState({ szoveg: "", kesz: false });

    // Feladatok betöltése Local Storage-ből az alkalmazás indulásakor
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('feladatok')) || [];
        setFeladatok(savedTasks);
    }, []);

    // Feladatok mentése Local Storage-be, ha változik az állapot
    useEffect(() => {
        localStorage.setItem('feladatok', JSON.stringify(feladatok));
    }, [feladatok]);

    const ujFeladatHozzaadasa = () => {
        if (ujFeladat.szoveg.trim()) {
            setFeladatok([...feladatok, ujFeladat]);
            setUjFeladat({ szoveg: "", kesz: false }); // Input mező ürítése
        }
    };

    return (
        <div className='text-center w-full bg-gray-700 min-h-screen p-5'>
                <input
                    className='rounded mx-2 px-1'
                    type="text"
                    value={ujFeladat.szoveg}
                    onChange={(e) => setUjFeladat({ ...ujFeladat, szoveg: e.target.value })}
                />
                <button className='rounded m-2 px-2 bg-gray-50' onClick={ujFeladatHozzaadasa}>
                    Feladat hozzáadása
                </button>
            <div>
                <ul>
                    {feladatok.map((feladat, index) => (
                        <li
                            className='bg-gray-400 rounded w-2/5 mx-auto my-1 p-3 space-x-32 grid grid-cols-3 items-center'
                            key={index}
                        >
                            <p className='text-left w-full break-words'>{feladat.szoveg}</p>
                            <div className='flex items-center gap-2'>
                                <input
                                    className='mx-2'
                                    type="checkbox"
                                    checked={feladat.kesz}
                                    onChange={(e) =>
                                        setFeladatok(
                                            feladatok.map((f, i) =>
                                                i === index ? { ...f, kesz: e.target.checked } : f
                                            )
                                        )
                                    }
                                />
                                <span>{feladat.kesz ? "Kész" : "Nincs Kész"}</span>
                            </div>
                            <button
                                className='rounded mx-2 px-2 bg-gray-50'
                                onClick={() => setFeladatok(feladatok.filter((_, i) => i !== index))}
                            >
                                Töröl
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FeladatLista;
