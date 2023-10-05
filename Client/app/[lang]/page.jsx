import Link from "next/link";
import { BlurBottom, BlurTop } from "./components/reusable/BlurBack";
import { Navigationbar } from "./components/reusable/Navigationbar";
import { Footer } from "./components/reusable/Footer";
import { getTranslation } from "./utils/translateUtils";

export default function Home(req) {
  const lang = getTranslation(req.params.lang);

  return (
    <div className="bg-white">
      <Navigationbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <BlurTop />
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              NextJS-IoT-Firebase-Redis-i18n-Docker-CRUD-API{" "}
              <Link
                href="https://github.com/Virtuallified/IoT_Link_Nexus"
                className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {lang?.iotNexus?.home?.welcome?.message}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {lang?.iotNexus?.home?.welcome?.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/pages/dashboard"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {lang?.iotNexus?.home?.button?.start}
              </Link>
              <Link
                href="https://github.com/Virtuallified/IoT_Link_Nexus"
                className="text-sm font-semibold leading-6 text-gray-900">
                {lang?.iotNexus?.home?.button?.more}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <BlurBottom />
      </div>
      <Footer />
    </div>
  );
}
