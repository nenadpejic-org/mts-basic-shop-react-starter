const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
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
  )
}

export default Footer
