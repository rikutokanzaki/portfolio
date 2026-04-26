import { PageTitle } from "@/components/layouts/PageTitle";
import { MediaLinks } from "@/components/layouts/MediaLinks";
import { ContactForm } from "@/components/layouts/ContactForm";

const initialTitle = "＊＊＊＊＊";
const resultTitle = "Contact";

export default function Contact() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ height: "calc(100dvh - var(--toggle-page-bar-reserved))", overflow: "hidden" }}
    >
      <main className="pt-10 mx-auto w-4/5 h-full flex flex-col">
        <PageTitle initialTitle={initialTitle} resultTitle={resultTitle} />

        <div className="w-full h-full flex flex-col justify-evenly">
          <MediaLinks />

          <ContactForm />
        </div>
      </main>
    </div>
  );
}
