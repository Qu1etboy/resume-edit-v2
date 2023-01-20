import React, { useEffect } from "react";
import AddFormButton from "./AddFormButton";
import Form from "./Form";
import type { Resume } from "@/lib/types";

const resumeForm = [
  {
    label: "Links",
    name: "links",
    fields: [
      {
        label: "Label",
        name: "label",
        placeHolder: "e.g. GitHub",
        type: "text",
      },
      {
        label: "Link",
        name: "link",
        placeHolder: "e.g. github.com/username",
        type: "text",
      },
    ],
    value: { label: "", link: "" },
    button: "Add contact",
  },
  {
    label: "Educations",
    name: "educations",
    fields: [
      {
        label: "School Name",
        name: "schoolName",
        placeHolder: "e.g. Harvard University",
        type: "text",
      },
      {
        label: "Degree",
        name: "degree",
        placeHolder: "e.g. B.S. Computer Science",
        type: "text",
      },
      {
        label: "Start - End Date",
        name: "date",
        placeHolder: "e.g. 2021-2024",
        type: "text",
      },
      {
        label: "Description",
        name: "schoolDescr",
        placeHolder: "e.g. B.S. Computer Science",
        type: "textarea",
      },
    ],
    value: { schoolName: "", schoolDescr: "" },
    button: "Add education",
  },
  {
    label: "Work Experience",
    name: "workExps",
    fields: [
      {
        label: "Company Name",
        name: "companyName",
        placeHolder: "e.g. Google",
        type: "text",
      },
      {
        label: "Job Title",
        name: "jobTitle",
        placeHolder: "e.g. Software Engineer",
        type: "text",
      },
      {
        label: "Start - End Date",
        name: "date",
        placeHolder: "e.g. May 2023 - Jun 2023",
        type: "text",
      },
      {
        label: "Description",
        name: "workDescr",
        placeHolder: "e.g. Description",
        type: "textarea",
      },
    ],
    value: {
      companyName: "",
      jobTitle: "",
      workDescr: "",
    },
    button: "Add work experience",
  },
  {
    label: "Skills",
    name: "skills",
    fields: [
      {
        label: "Skill",
        name: "skill",
        placeHolder: "e.g. JavaScript",
        type: "text",
      },
    ],
    value: { skill: "" },
    button: "Add skill",
  },
  {
    label: "Projects",
    name: "projects",
    fields: [
      {
        label: "Project Name",
        name: "projectName",
        placeHolder: "Project Name",
        type: "text",
      },
      {
        label: "Description",
        name: "projectDescr",
        placeHolder: "Description",
        type: "textarea",
      },
    ],
    value: { projectName: "", projectDescr: "" },
    button: "Add project",
  },
  {
    label: "Interests",
    name: "interests",
    fields: [
      {
        label: "Interest",
        name: "interest",
        placeHolder: "e.g. Listen to music",
        type: "text",
      },
    ],
    value: { interest: "" },
    button: "Add interest",
  },
];

export default function FormComponent({
  resume,
  setResume,
  setEdit,
}: {
  resume: Resume;
  setResume: (r: Resume) => void;
  setEdit: (e: boolean) => void;
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResume({ ...resume, [name]: value });
  };

  const handleAddForm = (e: React.MouseEvent<HTMLButtonElement>, data: any) => {
    data = { ...data, id: crypto.randomUUID() };
    setResume({
      ...resume,
      [e.currentTarget.name]: resume[e.currentTarget.name]
        ? [...resume[e.currentTarget.name], data]
        : [data],
    });
  };

  const handleChangeData = (data: any, field: string) => {
    setResume({
      ...resume,
      [field]: resume[field].map((d: any) => (d.id === data.id ? data : d)),
    });
  };

  const handleRemoveData = (dataId: string, field: string) => {
    setResume({
      ...resume,
      [field]: resume[field].filter((d: any) => d.id !== dataId),
    });
  };

  useEffect(() => {
    setEdit(true);
  }, [resume]);

  return (
    <form className="h-screen overflow-scroll p-8 flex flex-col gap-3">
      <div>
        <h2 className="text-lg mb-3 font-bold">Personal Information</h2>
        <label className="text-gray-500 text-sm">Name</label>
        <input
          placeholder="e.g. John Doe"
          name="name"
          value={resume?.name}
          className="p-2.5 bg-gray-50 mb-3 border rounded-md w-full"
          onChange={handleInput}
        />
        <label className="text-gray-500 text-sm">Job Title</label>
        <input
          placeholder="e.g. Software Engineer"
          name="job"
          value={resume?.job}
          className="p-2.5 bg-gray-50 mb-3 border rounded-md w-full"
          onChange={handleInput}
        />
        <label className="text-gray-500 text-sm">Address</label>
        <input
          placeholder="your address"
          name="address"
          value={resume?.address}
          className="p-2.5 bg-gray-50 mb-3 border rounded-md w-full"
          onChange={handleInput}
        />
        <label className="text-gray-500 text-sm">Email</label>
        <input
          placeholder="e.g. name@mail.com"
          name="email"
          value={resume?.email}
          className="p-2.5 bg-gray-50 mb-3 border rounded-md w-full"
          onChange={handleInput}
        />
        <label className="text-gray-500 text-sm">Phone</label>
        <input
          placeholder="e.g. 098-xxx-xxx"
          name="phone"
          value={resume?.phone}
          className="p-2.5 bg-gray-50 mb-3 border rounded-md w-full"
          onChange={handleInput}
        />
      </div>
      {resumeForm.map((form, idx) => (
        <div key={idx}>
          <h2 className="text-lg mb-3 font-bold">{form.label}</h2>
          {resume[form.name]?.map((value: any) => (
            <Form
              key={value.id}
              form={resumeForm[idx]}
              currValue={value}
              handleChangeData={handleChangeData}
              handleRemoveData={handleRemoveData}
            />
          ))}
          <AddFormButton
            text={form.button}
            name={form.name}
            handleAdd={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleAddForm(e, resumeForm[idx].value)
            }
          />
        </div>
      ))}
    </form>
  );
}
