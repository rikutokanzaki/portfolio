import { ContactInfo } from "@/components/layouts/ContactInfo";

export const MediaLinks = () => {
  return (
    <div className="glass-panel w-1/4 rounded-[1.75rem] p-4">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.45)]" />
        <h2 className="font-mono text-sm uppercase tracking-[0.28em] text-white/70">
          Social Links
        </h2>
      </div>

      <div className="h-full flex flex-col justify-evenly">
        <ContactInfo
          title="LinkedIn"
          linkText="rikutokanzaki"
          url="https://www.linkedin.com/in/rikutokanzaki/"
          logo="/linkedin_logo.png"
          bgColor="#fff"
        />
        <ContactInfo
          title="GitHub"
          linkText="rikutokanzaki"
          url="https://github.com/rikutokanzaki/"
          logo="/github_logo.svg"
          bgColor="#fff"
        />
        <ContactInfo
          title="Zenn"
          linkText="@rikutokanzaki"
          url="https://zenn.dev/rikutokanzaki/"
          logo="/zenn_logo.svg"
          bgColor="#fff"
        />
      </div>
    </div>
  );
};
