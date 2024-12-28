import React from 'react'


export default function TeamCard(props) {
    return (
        <div>
            <h2 className='text-[#189BA5] text-xl text-center'>{props.vertical}  Team</h2>
            <div className='text-center p-2' >
                <p className='p-1 text-lg text-center'>{props.member1}</p>
                <p className='p-1 text-lg text-center'>{props.member2}</p>
                <p className='p-1 text-lg text-center'>{props.member3}</p>
                <p className='p-1 text-lg text-center'>{props.member4}</p>
                <p className='p-1 text-lg text-center'>{props.member5}</p>
             
            </div>
        </div>
    )
}