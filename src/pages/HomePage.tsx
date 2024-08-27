import Button from '../components/ui/Button'
import Heading from '../components/ui/Heading'
import Paragraph from '../components/ui/Paragraph'

const HomePage = () => {
  return (
    <section className="relative h-[calc(100svh-72px)]">
      <img
        className="aspect-[16/9] h-full w-full bg-gray-200 object-cover object-center"
        srcSet="/images/snowboarder-jumping-mountain-mob.jpg 640w, /images/snowboarder-jumping-mountain-desk.jpg 1920w"
        src="/images/snowboarder-jumping-mountain-desk.jpg"
        alt="snowboarder-jumping-mountain"
      />

      <div className="container absolute inset-0 flex flex-col justify-end py-10">
        <Heading>Experience the Thrill</Heading>
        <Paragraph variant="lg-b">
          Elevate Your Snowboarding Adventure with Us!
        </Paragraph>
        <Button
          className="mt-5 self-start"
          as="a"
          href="/shop"
          variant="primary"
        >
          Shop
        </Button>
      </div>
    </section>
  )
}

export default HomePage
