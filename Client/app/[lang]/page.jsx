import { Navigationbar } from "./components/reusable/Navigationbar";
import { getTranslation } from "./utils/translateUtils";

export default function Home(req) {
  const lang = getTranslation(req.params.lang);

  return (
    <>
      <Navigationbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="">
          <p className="">{lang?.iotNexus?.translation?.welcome}</p>
        </div>
      </main>
    </>
  );
}
