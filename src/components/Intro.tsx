import React, { useState, useEffect } from 'react';

const Intro = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            content: (
                <div className="text-center text-black p-4">
                    <h1 className="text-black mx-auto p-16px text-4xl font-extrabold font-display mb-3">Bookends</h1>
                    <div className="loBookengo self-center m-6">
                        <img className='self-center mx-auto hover:shadow-lg w-fit' src="/src/assets/logo.svg" height={240} width={240} alt="Bookends Logo" />
                    </div>
                    <div className='font-body text-xs md:text-sm lg:text-base'>
                        <p className="font-extrabold">
                            Life is somewhat like a book.<br />
                            Every year, month, or day is a little book of its own.
                        </p>
                        <p className="font-bold">
                            Bookends is a simple journaling app to help you write down, reflect, and look at patterns in your life.<br />
                        </p>
                        <p>It is a work in progress, free and open source.</p>

                    </div>
                </div>
            ),
        },
        {
            content: (
                <div className="text-center text-black p-4">
                    <h2 className="text-2xl font-bold mb-3">Why Bookends?</h2>
                    <div className='font-body text-xs md:text-sm lg:text-base'>
                        <p>
                            Unlike other journaling software, Bookends focuses on simplicity and mindfulness.<br/>
                            No distractions, no unnecessary features—<span className='font-bold'>just you and your thoughts.</span>
                        </p>
                        <p><br/>
                            It's designed to help you reflect deeply and stay consistent without forcing you into a rigid<br/> structure by making your little journals as <span className='text-amber-600 font-extrabold hover:underline'> aesthetically pleasing</span> as possible.
                        </p>

                    </div>
                </div>
            ),
        },
        {
            content: (
                <div className="text-center text-black p-4">
                    <h2 className="text-2xl font-bold mb-3">Features</h2>
                    <div className='font-body text-xs md:text-sm lg:text-base'>
                        <p>Bookends offers:</p>
                        <ul className="list-disc list-inside">
                            <li>Minimalist design for focused journaling</li>
                            <li>Daily, weekly, and monthly reflections</li>
                            <li>Pattern analysis to help you grow</li>
                        </ul>
                        <div className="mt-4">
                            <img
                                src="/src/assets/features-screenshot.png"
                                alt="Features Screenshot"
                                className="rounded-lg shadow-lg"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>

                    </div>
                </div>
            ),
        },
        {
            content: (
                <div className="text-center text-black p-4">
                    <h2 className="text-2xl font-bold mb-3">Simple, Free, and Open Source</h2>
                    <div className='font-body text-xs md:text-sm lg:text-base'>
                        <p>
                            Bookends is incredibly easy to use. It's free and open source, so anyone can contribute or customize it.
                        </p>
                        <p>
                            If you love Bookends, consider donating or contributing on GitHub to support its development:

                        </p>
                        <div className='flex flex-col justify-evenly justify-items-center items-center'>
                        <div className="mt-4 w-fit">
                        <a  href='https://ko-fi.com/Z8Z74DCR4' target='_blank'><img height='36' className='border-0 h-[36px]'  src='https://storage.ko-fi.com/cdn/kofi1.png?v=6' alt='Buy Me a Coffee at ko-fi.com' /></a>
                        </div>
                        <div>
                            <a href="https://github.com/aswinnnn/bookends" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://img.shields.io/badge/GitHub-Bookends-bfff00?style=flat-square&logo=github"
                                    alt="GitHub"
                                    className="mt-4 rounded ring-2 ring-gray-300 hover:ring-gray-500 transition duration-200"
                                />
                            </a>
                        </div>

                        </div>

                    </div>
                </div>
            ),
        },
    ];

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
            handleNext();
        } else if (event.key === 'ArrowLeft') {
            handlePrev();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-lime-100 text-white leading-7">
            <div className="relative w-full max-w-3xl overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            {slide.content}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center lg:justify-between gap-3 w-full max-w-3xl mt-4">
                <button
                    onClick={handlePrev}
                    className="hidden lg:block bg-black text-white px-4 py-2 rounded-4xl hover:bg-gray-800 hover:cursor-pointer hover:shadow-lg hover:shadow-gray-500/50 transition-transform duration-200 hover:translate-y-[-5px]"
                >
                    Previous
                </button>
                <div>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full mx-1 ${currentSlide === index ? 'bg-lime-400' : 'bg-gray-300'}`}
                        ></button>
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="hidden lg:block bg-black text-white px-4 py-2 rounded-4xl hover:bg-gray-800 hover:cursor-pointer hover:shadow-lg hover:shadow-gray-500/50 transition-transform duration-200 hover:translate-y-[-5px]"
                >
                    {currentSlide === slides.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Intro;