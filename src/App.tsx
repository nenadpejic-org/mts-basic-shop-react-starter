import ShoppingCart from '@/assets/shopping_cart.svg?react'

function App() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed inset-x-0 top-0 z-10 bg-white">
        <div className="container py-6">
          <nav className="flex items-center">
            <a className="font-extrabold" href="">
              Basic Shop
            </a>
            <ul className="ml-10 flex items-center gap-6">
              <li>
                <a
                  className="inline-block font-medium hover:underline"
                  href="/shop"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  className="inline-block font-medium hover:underline"
                  href="/console"
                >
                  Console
                </a>
              </li>
            </ul>

            <ShoppingCart className="ml-auto" />
          </nav>
        </div>
      </header>

      <main className="mt-[72px] grow">
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
      </main>

      <footer className="border-t">
        <div className="container flex flex-wrap items-center justify-between py-6">
          <p className="text-sm text-neutral-700">
            © 2024{currentYear > 2024 ? `-${currentYear}` : ''} Basic Shop, All
            rights reserved.
          </p>
          <a
            className="text-sm"
            target="_blank"
            href="https://github.com/nenadpejic"
          >
            Crafted by Nenad Pejic
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
