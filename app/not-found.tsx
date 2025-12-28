import { Link } from 'next-view-transitions'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-[1800px] mx-auto w-full">
        <div className="text-center">
          {/* Company Name */}
          <div className="text-xs sm:text-sm md:text-base text-gray-500 uppercase tracking-[0.15em] mb-4 sm:mb-6 font-light">
            Exact Solutions Limited
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-light text-white leading-[1.05] tracking-[-0.04em] mb-6 sm:mb-8">
            EXACT
            <br />
            <span className="font-normal text-primary">SOLUTIONS</span>
          </h1>
          
          {/* Limited Badge */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <div className="h-px w-12 sm:w-16 md:w-20 bg-primary/40"></div>
            <span className="text-sm sm:text-base md:text-lg text-gray-400 uppercase tracking-[0.25em] font-light">
              Limited
            </span>
            <div className="h-px w-12 sm:w-16 md:w-20 bg-primary/40"></div>
          </div>

          {/* Website Under Construction - BIGGER */}
          <div className="mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-4 justify-center flex-wrap">
              <div className="h-px w-12 sm:w-16 md:w-24 bg-primary/30"></div>
              <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-primary uppercase tracking-[0.2em] font-medium text-center">
                Website Under Construction
              </span>
              <div className="h-px w-12 sm:w-16 md:w-24 bg-primary/30"></div>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="pt-6 sm:pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-300 group touch-manipulation"
            >
              <div className="h-px w-6 sm:w-8 bg-gray-600 group-hover:bg-primary transition-colors duration-300"></div>
              <span className="uppercase tracking-[0.15em]">Return to Home</span>
              <div className="h-px w-6 sm:w-8 bg-gray-600 group-hover:bg-primary transition-colors duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

