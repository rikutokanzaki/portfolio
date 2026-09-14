import { ContactForm } from "@/components/layouts/ContactForm";
import { MediaLinks } from "@/components/layouts/MediaLinks";
import { PageTitle } from "@/components/layouts/PageTitle";

const initialTitle = "-----";
const resultTitle = "Contact";

export default function Contact() {
  return (
    <div className="min-h-full w-full min-w-0 overflow-x-clip">
      <main className="mx-auto flex min-h-[calc(100dvh-var(--toggle-page-bar-reserved))] w-full max-w-7xl min-w-0 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PageTitle initialTitle={initialTitle} resultTitle={resultTitle} />

        <div className="flex h-full gap-6">
          <MediaLinks />
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
