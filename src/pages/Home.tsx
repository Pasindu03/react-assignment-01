import slide1 from "../assets/img/book-library-with-open-textbook-min.png";
import slide2 from "../assets/img/library-with-books-min.jpg";
import slide3 from "../assets/img/bottom-min.jpg";
export function Home () {

        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-item');

        function showSlide(index:number) {
        slides[currentSlide].classList.add('hidden');
        slides[index].classList.remove('hidden');
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

        function goToSlide(index:number) {
        showSlide(index);
    }
    return (
        <section id="home">
            <div id="carouselExampleIndicators" className="relative w-full">
                <div className="flex justify-between absolute top-1/2 left-0 right-0 z-10 transform -translate-y-1/2">
                    <button className="bg-transparent rounded-full p-2 m-2" onClick={() => {
                        prevSlide();
                    }}>
                        <span className="text-9xl font-light" >&lt; </span>
                    </button>
                    <button className="bg-transparent rounded-full p-2 m-2" onClick={() => {
                        nextSlide();
                    }}>
                        <span className="text-9xl font-light">&gt;</span>
                    </button>
                </div>
                <div className="relative overflow-hidden">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={slide1} className="block w-full"
                                 alt="Slide 1"/>
                        </div>
                        <div className="carousel-item hidden">
                            <img src={slide2} className="block w-full" alt="Slide 2"/>
                        </div>
                        <div className="carousel-item hidden">
                            <img src={slide3} className="block w-full" alt="Slide 3"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-2">
                    <button className="bg-gray-300 rounded-full w-3 h-3 mx-1" onClick={()=>{goToSlide(0)}}></button>
                    <button className="bg-gray-300 rounded-full w-3 h-3 mx-1" onClick={()=>{goToSlide(1)}}></button>
                    <button className="bg-gray-300 rounded-full w-3 h-3 mx-1" onClick={()=>{goToSlide(2)}}></button>
                </div>
            </div>
        </section>
    )
}