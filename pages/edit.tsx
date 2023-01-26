import ResumeComponent from "@/components/Resume";
import FormComponent from "@/components/FormComponent";
import type { Resume } from "@/lib/types";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import ResumeSkeletion from "@/components/ResumeSkeletion";
import Container from "@/components/Container";

export default function EditResume() {
  const [resume, setResume] = useState<Resume | null>(null);

  const { data: session } = useSession();
  const [isEdit, setEdit] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    const getData = async () => {
      // client side use getSession()
      const session = await getSession();
      const res = await fetch(
        `http://localhost:3000/api/resume?id=${session?.user?.id}`
      );
      const data = await res.json();

      // if there is no data or resume data is undefined used initial value
      setResume(() =>
        data === null || data.resume === undefined
          ? {
              name: "",
              job: "",
              address: "",
              email: "",
              phone: "",
            }
          : data.resume
      );
    };

    getData();
  }, []);

  const handleSave = async () => {
    try {
      await fetch("http://localhost:3000/api/resume", {
        method: "POST",
        body: JSON.stringify({ resume, id: session?.user?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetResume = (resume: Resume) => {
    setResume(resume);
  };

  return (
    <Container title="Resume Editor" className="flex">
      <section className="w-full print:hidden">
        {resume !== null && (
          <FormComponent
            resume={resume}
            setResume={handleSetResume}
            setEdit={setEdit}
          />
        )}
      </section>
      <section
        className={`${
          openPreview ? "block" : "hidden"
        } fixed lg:relative lg:block w-full h-screen print:block print:h-full overflow-scroll p-5 print:p-0 print:border-0 bg-slate-400`}
      >
        <div className="print:hidden">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => print()}
          >
            Download PDF
          </button>
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleSave}
          >
            Save
          </button>
          <span className="text-gray-100">
            {isEdit ? "Not Saved" : "Saved!"}
          </span>
        </div>
        <div className="bg-white mt-2 overflow-hidden rounded-md shadow-xl print:shadow-none">
          {resume !== null ? (
            <ResumeComponent resume={resume as Resume} />
          ) : (
            <ResumeSkeletion />
          )}
        </div>
      </section>
      <button
        onClick={() => setOpenPreview(!openPreview)}
        className="fixed bottom-0 right-0 lg:hidden text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base drop-shadow-xl border px-5 py-2.5 text-center mr-2 mb-2"
      >
        {openPreview ? "Edit" : "Preview"}
      </button>
    </Container>
  );
}
