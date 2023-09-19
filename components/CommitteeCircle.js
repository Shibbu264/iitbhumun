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
                className="mx-2 w-[13.313rem] h-[13.313rem]  shadow-[#189BA5]/20  background-[white] top-[12.5rem] left-[9.836rem]"
            >
                <div className="flex flex-col items-center fragment ">
            
                        <Image className="  "
                            src={props.src}
                            width={125}
                            height={125}
                            alt=""
                            
                        />
                    
                    
                </div>
            </button>
            <DialogBox open={open} handleOpen={handleChange} href={props.href} title={props.title} data={props.data} chair={props.chair} vicechair={props.vicechair} agenda={props.agenda} csrc={props.chairsrc} vcsrc={props.vicechairsrc} />
        </Fragment>
    );
}
