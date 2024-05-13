import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'

const HomePage = () => {
  return (
    <section className="relative h-[calc(100svh-72px)]">
      <img
        className="aspect-[16/9] h-full w-full bg-gray-200 object-cover object-center"
        src="https://source.unsplash.com/man-in-black-jacket-and-brown-pants-lying-on-snow-covered-ground-during-daytime-q80sx583gzE"
        alt=""
      />
      <div className="container absolute inset-0 flex flex-col justify-end py-6">
        <Heading>Experience the Thrill</Heading>
        <Paragraph variant="lg-b">
          Elevate Your Snowboarding Adventure with Us!
        </Paragraph>
        <Button
          className="mt-5 self-start"
          as="a"
          href="/shop"
          variant="secondary"
        >
          Shop
        </Button>
      </div>
    </section>
  )
}

export default HomePage
