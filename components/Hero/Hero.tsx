import { H4, Title } from "@/components/text";

export function Hero() {
  return (
    <div
      id="hero-section"
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-background.png')" }}
    >
      <div className="text-center px-6">
        <Title className="font-bold">
          We build
          <br />
          <em>simplicity</em>
        </Title>
        <H4 className="mt-20 max-w-2xl mx-auto">
          We build intelligent tools and infrastructure to help people and AI{" "}
          <br />
          work together, streamlining workflows
        </H4>
      </div>
    </div>
  );
}
