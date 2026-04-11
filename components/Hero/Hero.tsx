import { Title } from "@/components/text";

export function Hero() {
  return (
    <div
      id="hero-section"
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-background.png')" }}
    >
      <Title className="text-center font-bold">
        We build
        <br />
        <em>simplicity</em>
      </Title>
    </div>
  );
}
