import React from 'react'

const Suggestions = () => {
    return (
        <div className='flex gap-1 mb-2 items-center justify-center'>

            <div className="flex-1 flex-col flex items-center justify-center">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI327d9xKBPs8w7rJL5j40RNoOu2jG2WR0Pg&s' className='w-[80px] h-[80px] rounded-lg' />
                <b className='text-[grey]'>username</b>
            </div>

            <div className="flex-1 flex flex-col gap-2 items-center">
                <button className='py-1 flex items-center justify-center px-3 text-sm text-[white] rounded-md bg-[#318CE7] bg-[#]'>follow</button>

                <button className='py-1 flex items-center justify-center rounded-md px-2 text-sm bg-[lightgrey]'>withdraw</button>
            </div>

        </div>
    )
}

export default Suggestions
