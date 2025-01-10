import Image from "next/image";
import { Fragment, useState } from "react";
import DialogBox from "./Dialog";

export default function CommitteeCircle(props) {
    const [open, setOpen] = useState(false);

    const handleChange = () => {
        setOpen(!open);
    }

    return (
        
        <Fragment >
            <button
                onClick={handleChange}
                className="mx-2 w-[11.313rem] h-[11.313rem] rounded-full shadow-[#E84C6D]/20 shadow-xl top-[12.5rem] left-[9.836rem] bg-white"
            >
                <div className="flex flex-col items-center">
                    <div className="pt-[1.688rem]">
                        <Image
                            src={props.src}
                            width={114}
                            height={95}
                            alt=""
                        />
                    </div>
                    <div className="font-bold font-sans text-[1.2rem] pb-2 text-[#E84C6D]">
                        {props.title}
                    </div>
                </div>
            </button>
            <DialogBox open={open} handleOpen={handleChange} href={props.href} title={props.title} data={props.data} chair={props.chair} vicechair={props.vicechair} agenda={props.agenda} csrc={props.chairsrc} vcsrc={props.vicechairsrc} />
        </Fragment>
    );
}
