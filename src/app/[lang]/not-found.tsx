
import Image from 'next/image'

import Button from './components/Button'

function NotFoundPage() {
  return (
    <div className="bg-white lg:h-screen lg:text-center lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div className="flex items-center justify-center mb-14">
        <Image
          src="/vincent-vega.gif"
          width={500}
          height={500}
          alt="Vincent vega confused"
        />
      </div>
      <div className="lg:leading-[48px] lg:flex text-black">
        <h1 className="lg:mr-5 lg:pr-5 lg:font-medium lg:text-2xl lg:border-r-2 lg:border-zinc-600">
          404
        </h1>
        <div className="lg:flex lg:items-center">
          <h2 className="lg:text-sm lg:font-normal">
            Yikes, här var det tomt..
          </h2>
        </div>
      </div>
      <div className="mt-10">
        <Button text="Tillbaka till startsidan" />
      </div>
    </div>
  );
}

export default NotFoundPage;
