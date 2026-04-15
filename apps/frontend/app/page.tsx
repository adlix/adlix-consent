export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 px-8 py-32">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          adlix consent
        </h1>
        <p className="max-w-md text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Consent-Plattform: Beschreibung &rarr; Abstimmung &rarr; Einspruch
          &rarr; Diskussion &rarr; Anpassung &rarr; neuer Loop
        </p>
      </main>
    </div>
  );
}
