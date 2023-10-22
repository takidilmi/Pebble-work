import React from "react";

function HeroCard() {
    const handleButtonClick = (path) => {
        window.location.href = path;
    };

    return (
        <div className='w-full h-[720px] bg-white flex justify-center items-center'>
            <div className='text-center p-4'>
                <div className='max-w-screen-xl mx-auto'>
                    <div className="text-4xl font-medium font-'Rubik' leading-10 tracking-tight text-zinc-900">
                        Become the change you wish to see in the world.
                    </div>
                    <div className="text-xl font-normal font-'Rubik' leading-10 tracking-tight text-zinc-500">
                        Body placeholder for text paragraph. A paragraph is a
                        self-contained unit of text dealing with a particular
                        point or idea.
                    </div>
                    <div className='mt-8 flex flex-col sm:flex-row justify-center items-center gap-6'>
                        <div className='cursor-pointer'>
                            <div
                                className="text-2xl font-medium font-'Rubik' leading-10 tracking-tight bg-cyan-700 text-white px-4 py-2 rounded-lg"
                                onClick={() =>
                                    handleButtonClick("/target-page-1")
                                }
                            >
                                Get started
                            </div>
                        </div>
                        <div className='cursor-pointer'>
                            <div
                                className="text-2xl font-medium font-'Rubik' leading-10 tracking-tight text-zinc-900"
                                onClick={() =>
                                    handleButtonClick("/target-page-2")
                                }
                            >
                                Who are we
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroCard;