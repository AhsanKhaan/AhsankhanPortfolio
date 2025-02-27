import React from 'react'

const Experience = () => {
    return (
        <>
            <section>
                <div className='dark:bg-darkSection my-10 dark:bg-gray' id='experience'>
                    <h1 className='text-3xl font-bold text-center'>Experience</h1>
                    <div className='flex flex-col md:flex-row justify-between items-center my-10'>
                        <div className='flex flex-col md:w-1/2'>
                            <h2 className='text-2xl font-semibold'>Frontend Developer</h2>
                            <p className='text-lg text-gray-500'>Company Name</p>
                            <p className='text-lg text-gray-500'>May 2021 - Present</p>
                            <ul className='list-disc list-inside'>
                                <li>Worked on a project</li>
                                <li>Worked on a project</li>
                                <li>Worked on a project</li>
                            </ul>
                        </div>
                        <div className='flex flex-col md:w-1/2'>
                            <h2 className='text-2xl font-semibold'>Backend Developer</h2>
                            <p className='text-lg text-gray-500'>Company Name</p>
                            <p className='text-lg text-gray-500'>May 2021 - Present</p>
                            <ul className='list-disc list-inside'>
                                <li>Worked on a project</li>
                                <li>Worked on a project</li>
                                <li>Worked on a project</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Experience