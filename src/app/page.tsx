// src/app/page.tsx

import { getFeaturedProducts, getAllProducts } from "../lib/sanity";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import Link from "next/link";

export const revalidate = 60; // Revalidate svake minute

export default async function Home() {
  const featuredProducts: Product[] = await getFeaturedProducts();
  const allProducts: Product[] = await getAllProducts();

  // Ako nema featured, uzmi prvih 4
  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4);

  return (
    <div>
      <section className="px-4 py-20 sm:py-28">
        <div className="container mx-auto rounded-[2rem] border border-[#e9dfd1] bg-white/80 px-6 py-16 text-center shadow-[0_20px_60px_-30px_rgba(63,52,45,0.35)] sm:px-10 lg:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#b08c64]">
            Ručno izrađen nakit
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#2f261f] sm:text-5xl lg:text-6xl">
            Elegantni komadi za svakodnevni i poseban trenutak.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6259]">
            Otkrij kolekciju nakita koja spaja jednostavnost, sofisticiranost i
            osobni stil.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center rounded-full bg-[#3f342d] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#2f261f]"
          >
            Pogledaj kolekciju
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6 sm:py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-[#2f261f]">
            {featuredProducts.length > 0
              ? "Istaknuti proizvodi"
              : "Naši proizvodi"}
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-[#8b7563] transition hover:text-[#3f342d]"
          >
            Vidi sve →
          </Link>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[#e4d8c8] bg-white/70 px-8 py-12 text-center text-[#6f6259]">
            Trenutno nema dostupnih proizvoda.
          </div>
        )}
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto rounded-[2rem] border border-[#e9dfd1] bg-[#f7efe7] px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-semibold text-[#2f261f]">
              O nakitu
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-8 text-[#6f6259]">
              <p>
                Naš nakit izrađen je od <em>18K Gold Filled</em> materijala –
                visokokvalitetnog materijala koji je nježan prema koži i
                prikladan čak i za osobe s osjetljivom kožom.
              </p>
              <p>
                Za razliku od klasične pozlate, kod koje se tanki sloj zlata s
                vremenom može istrošiti, <em>18K Gold Filled</em> sastoji se
                od debelog sloja pravog 18-karatnog zlata (najmanje 5 %
                ukupne težine materijala) koji je pod visokim pritiskom i
                temperaturom trajno spojen s metalnom jezgrom. Rezultat je
                iznimno izdržljiv i dugotrajan materijal koji godinama zadržava
                svoj izgled.
              </p>
              <p>
                Materijal ne sadrži nikal, a zahvaljujući debelom sloju pravog
                zlata površina nakita koja dolazi u dodir s kožom sastoji se od
                zlata, zbog čega je ugodan za nošenje i prikladan za većinu
                osoba s osjetljivom kožom.
              </p>
              <p>
                Naš nakit stvoren je za svakodnevno nošenje. Možete ga nositi
                tijekom cijelog dana, uključujući tuširanje, pranje ruku,
                boravak na plaži i druge uobičajene svakodnevne aktivnosti.
              </p>
              <p>
                Kao i svaki kvalitetan komad nakita, uz malo pažnje zadržat će
                svoj sjaj još dulje. Dugotrajno izlaganje agresivnim
                kemikalijama, kloriranoj vodi, parfemima ili kozmetičkim
                proizvodima može s vremenom utjecati na njegov izgled, a
                prirodne promjene mogu nastati i zbog individualnog pH kože.
                Zato preporučujemo da nakit, kada ga ne nosite, čuvate na suhom
                mjestu te ga po potrebi prebrišete mekom, suhom krpicom.
              </p>
              <p>
                <em>
                  18K Gold Filled nakit stvoren je kako bi bio dio vaše
                  svakodnevice – elegantan, izdržljiv i bezbrižan za nošenje,
                  iz dana u dan.
                </em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:pb-20">
        <div className="container mx-auto rounded-[2rem] border border-[#e9dfd1] bg-white/80 px-6 py-12 shadow-[0_20px_60px_-30px_rgba(63,52,45,0.2)] sm:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-semibold text-[#2f261f]">
              Dostava
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-8 text-[#6f6259]">
              <p>
                Dostava se vrši putem BoxNow paketomata.
              </p>
              <div className="rounded-[1.25rem] border border-[#e9dfd1] bg-[#f9f4eb] p-6">
                <h3 className="text-xl font-semibold text-[#2f261f]">
                  Standardna dostava
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>• Cijena: 3 EUR</li>
                  <li>
                    • Vrijeme isporuke: u pravilu 2–3 radna dana od slanja
                    pošiljke do dostave u odabrani BoxNow paketomat.
                  </li>
                </ul>
              </div>
              <p>
                Besplatna standardna dostava dostupna je za sve narudžbe iznad
                50€.
              </p>
              <p>
                Nakon što zaprimimo vašu narudžbu, započinjemo njezinu obradu.
                Kada pošiljku predamo dostavnoj službi, primit ćete e-mail s
                potvrdom o otpremi. Kada pošiljka stigne u odabrani BoxNow
                paketomat, primit ćete SMS ili e-mail s kodom (PIN-om) za
                preuzimanje. Paket možete preuzeti u bilo koje doba dana ili
                noći (24/7).
              </p>
              <p>
                Pošiljka će u paketomatu biti pohranjena ograničeno vrijeme.
                Nakon isteka tog roka vraća se pošiljatelju. Prilikom
                preuzimanja potrebno je unijeti zaprimljeni kod (PIN) na zaslonu
                paketomata.
              </p>
              <p>
                Molimo vas da prilikom preuzimanja pregledate paket i provjerite
                postoje li vidljiva oštećenja. U slučaju oštećenja, molimo da
                nas odmah kontaktirate.
              </p>
              <p>
                Svaki komad nakita pažljivo pakiramo kako bi do vas stigao u
                besprijekornom stanju.
              </p>
              <p>
                Trenutačno dostavljamo isključivo unutar Republike Hrvatske.
              </p>
              <p>
                Napomena: navedeni rokovi isporuke su procijenjeni i mogu se
                promijeniti zbog okolnosti na koje ne možemo utjecati
                (primjerice vremenskih uvjeta ili povećanog opsega posla
                dostavne službe). Dostava u BoxNow paketomat dostupna je ovisno
                o pokrivenosti BoxNow mreže na vašem području.
              </p>
              <p>
                Ako imate pitanja vezana uz dostavu, slobodno nam se obratite
                putem e-maila na{' '}
                <a
                  href="mailto:ivona.unikat.nakit@gmail.com"
                  className="font-semibold text-[#8b7563] underline decoration-[#b08c64] underline-offset-2"
                >
                  ivona.unikat.nakit@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
