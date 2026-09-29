import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

function SettingsSection() {
  return (
    <section id="settings">
      <SectionHeader
        eyebrow="Settings"
        title="Demo Configuration"
        description="Client-side voice, local history, and live camera tracking keep the demo fast with no database dependency."
      />
      <Card className="p-6" hover={false}>
        <div className="grid gap-4 md:grid-cols-3">
          {["Browser Speech", "Local History", "Groq-ready API"].map((item) => (
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5" key={item}>
              <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Enabled</span>
              <strong className="mt-2 block text-lg font-black text-white">{item}</strong>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

export default SettingsSection;
