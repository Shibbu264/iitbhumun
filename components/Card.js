import { useState } from "react";
import data from "../data/data.json";
import Image from 'next/image';

export default function Card(props) {

    console.log(props.id)

    var element = {}

    for (let index = 0; index < data.gallery.length; index++) {
        if (props.id == data.gallery[index].id) {
            element = data.gallery[index];
            console.log(element)
        }
    }

    const [state, setState] = useState(true)

    const handleClick = () => {
        setState(false)
        location.reload()
    }

    return (
        
            <div className={(state && props.open) ? "absolute top-11 left-12 block z-999 opacity-700" : "hidden"}>
            <div className="max-w-sm rounded shadow-lg wrap" id="card">
                <Image
                    width={336}
                    height={251.6}
                    src={element.src}
                    alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                    <div className="flex flex-wrap justify-between">
                        <div className="font-bold text-xl mb-2">{element.title}</div>
                        <button id="close" onClick={handleClick}>
                            <strong className="text-3xl align-end cursor-pointer alert-del">
                                &times;
                            </strong>
                        </button>
                    </div>
                    <p className="text-gray-700 text-base font-bold">{element.text}</p>
                </div>
            </div>
        </div>

    );
}

    