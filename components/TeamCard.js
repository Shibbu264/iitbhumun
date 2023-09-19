import React from 'react'


export default function TeamCard(props) {
    return (
        <div>
           
            <div className='text-center p-6 w-96 h-96 my-12 rounded-lg bg-[#abcf3a]'>
            <h2 className='text-[#189BA5]  text-3xl font-bold text-center'>{props.vertical}  Team</h2>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member1}</p>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member2}</p>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member3}</p>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member4}</p>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member5}</p>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member6}</p>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member7}</p>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member8}</p>
                <p className='px-1 my-0 text-2xl font-bold text-center'>{props.member9}</p>
                <img className=' block mx-auto w-fit h-fit' src={props.img}/>
            </div>
        </div>
    )
}