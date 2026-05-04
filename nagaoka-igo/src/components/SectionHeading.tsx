export default function SectionHeading({
  en,
  ja,
}: {
  en: string;
  ja: string;
}) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs tracking-[0.35em] text-[#5a7a5a] uppercase mb-2">
        {en}
      </p>
      <h2
        className="text-3xl sm:text-4xl font-light text-[#1a1a1a]"
        style={{ fontFamily: "var(--font-noto-serif)" }}
      >
        {ja}
      </h2>
      <div className="brush-divider mt-4 w-16 mx-auto" />
    </div>
  );
}
