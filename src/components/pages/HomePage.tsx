const HomePage = () => {
  return (
    <section className="relative h-[calc(100svh-72px)]">
      <img
        className="aspect-[16/9] h-full w-full object-cover object-center"
        src="https://source.unsplash.com/man-in-black-jacket-and-brown-pants-lying-on-snow-covered-ground-during-daytime-q80sx583gzE"
        alt=""
      />
      <div className="container absolute inset-0 flex flex-col justify-end py-6">
        <h1 className="text-2xl font-bold">Experience the Thrill</h1>
        <p className="font-medium">
          Elevate Your Snowboarding Adventure with Us!
        </p>
        <div>
          <a
            className="mt-5 inline-block bg-white px-6 py-2 font-medium"
            href="/shop"
          >
            Shop
          </a>
        </div>
      </div>
    </section>
  )
}

export default HomePage
