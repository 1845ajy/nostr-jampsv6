"use client";
import { createForum } from "@/utils/nostr";

import PageHeader from "@/components/PageHeader";
import BackButton from "@/components/BackButton";
import ButtonSubmit from "@/components/ButtonSubmit";
import TextInput from "@/components/TextInput";

import { useRouter } from "next/navigation";

export default async function CreateForum() {
  const router = useRouter();

  const create = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const name = event.target.elements.name.value;
    const phone = event.target.elements.phone.value;
    const email = event.target.elements.email.value;
    const forumId = await createForum({ title, description, name, phone, email });
    router.push(`/forum/${forumId}`);
  };

  return (
    <div className="flex flex-col m-8">
      <div className="space-y-2 mb-4">
        <BackButton />
        <PageHeader copy="Create a Supplier Forum" />
      </div>

      <form onSubmit={create}>
        <div className="space-y-4">
          <TextInput
            copy="Supplier Title"
            name="title"
            placeholder="Enter Supplier "
          />
          <TextInput
            copy="Supplier Address"
            name="description"
            placeholder="Enter your address"
          />
          <TextInput
            copy="Contact Name"
            name="name"
            placeholder="Enter your Name"
          />
           <TextInput
            copy="Contract Number"
            name="phone"
            placeholder="Enter your Phone Number"
          />
         <TextInput
            copy="Email"
            name="email"
            placeholder="Enter your Email"
          />
          <ButtonSubmit />
        </div>
      </form>
    </div>
  );
}
