export default function Hero() {
    return (
        <section className="background-radial-gradient mb-32 text-center lg:text-left">
            <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://mdbcdn.b-cdn.net/img/new/standard/nature/071.jpg')] h-[500px]">
            <div
                className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
                <div className="flex h-full items-center justify-center">
                <div className="max-w-[800px] px-6 py-6 text-center text-white md:py-0 md:px-12">
                    <h2 className="mb-12 text-5xl font-bold leading-tight tracking-tight md:text-6xl xl:text-7xl">
                    <span className="inline-block">Local Market</span>
                    </h2>
                    <p className="text-lg">
                    Where everything comes together.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
}