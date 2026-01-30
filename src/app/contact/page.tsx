import { FAQSection } from "@/components/sections/FAQ";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Kontakt</h1>
        <p className="text-xl text-neutral-400 max-w-2xl">
          Haben Sie Fragen? Wir haben die Antworten. Melden Sie sich bei uns für
          Ihr nächstes Projekt.
        </p>
      </div>
      <FAQSection />
    </div>
  );
}
