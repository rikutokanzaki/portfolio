import { ContactInfo } from "@/components/layouts/ContactInfo";

export const MediaLinks = () => {
  return (
    <div className="py-3 px-4 w-full mx-auto bg-(--background) border-2 border-white rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.35)] flex justify-around">
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
  );
}
