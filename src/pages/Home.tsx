import slide1 from "../assets/img/book1.jpg";
import slide2 from "../assets/img/book2.jpg";
import slide3 from "../assets/img/book3.jpg";

export function Home() {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-item");

    function showSlide(index: number) {
        slides[currentSlide].classList.add("hidden", "opacity-0");
        slides[currentSlide].classList.remove("opacity-100");
        slides[index].classList.remove("hidden");
        slides[index].classList.add("opacity-100");
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    function goToSlide(index: number) {
        showSlide(index);
    }

    return (
        <section id="home" className="relative w-full h-screen bg-gray-100">
            {/* Carousel */}
            <div className="relative w-full h-full overflow-hidden">
                {/* Carousel Content */}
                <div className="carousel-inner h-full">
                    <div className="carousel-item absolute top-0 left-0 w-full h-full opacity-100 transition-opacity duration-700">
                        <img
                            src={slide1}
                            className="block w-full h-full object-cover"
                            alt="Slide 1"
                        />
                    </div>
                    <div className="carousel-item absolute top-0 left-0 w-full h-full hidden opacity-0 transition-opacity duration-700">
                        <img
                            src={slide2}
                            className="block w-full h-full object-cover"
                            alt="Slide 2"
                        />
                    </div>
                    <div className="carousel-item absolute top-0 left-0 w-full h-full hidden opacity-0 transition-opacity duration-700">
                        <img
                            src={slide3}
                            className="block w-full h-full object-cover"
                            alt="Slide 3"
                        />
                    </div>
                </div>

                {/* Futuristic Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center text-white space-y-6">
                        <h1 className="text-4xl font-extrabold tracking-wide uppercase">
                            Welcome to Netly Bookstore
                        </h1>
                        <p className="text-lg font-light max-w-2xl mx-auto">
                            A new era of reading awaits you. Explore our collection of over{" "}
                            <span className="font-bold">10,000 books</span>, trusted by
                            <span className="font-bold"> 5 million readers</span> worldwide.
                        </p>

                        {/* Sales Data */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold">50%</h2>
                                <p className="text-sm uppercase tracking-wide">
                                    Discount on Bestsellers
                                </p>
                            </div>
                            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold">1M+</h2>
                                <p className="text-sm uppercase tracking-wide">
                                    Books Sold This Year
                                </p>
                            </div>
                            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold">98%</h2>
                                <p className="text-sm uppercase tracking-wide">
                                    Customer Satisfaction
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4 z-10">
                    <button
                        className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
                        onClick={prevSlide}
                    >
                        <span className="text-3xl font-bold text-gray-600">&lt;</span>
                    </button>
                    <button
                        className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
                        onClick={nextSlide}
                    >
                        <span className="text-3xl font-bold text-gray-600">&gt;</span>
                    </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 z-10">
                    <button
                        className="bg-gray-400 rounded-full w-4 h-4 hover:bg-gray-600 transition"
                        onClick={() => goToSlide(0)}
                    ></button>
                    <button
                        className="bg-gray-400 rounded-full w-4 h-4 hover:bg-gray-600 transition"
                        onClick={() => goToSlide(1)}
                    ></button>
                    <button
                        className="bg-gray-400 rounded-full w-4 h-4 hover:bg-gray-600 transition"
                        onClick={() => goToSlide(2)}
                    ></button>
                </div>
            </div>
        </section>
    );
}
