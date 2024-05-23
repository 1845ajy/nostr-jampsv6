import ForumList from "@/components/ForumList";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";

export default async function Home() {
  return (
<main className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-8 space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <PageHeader copy="Nostr-Supply Chain Client" />
          <p className="text-base text-gray-700 mt-2">Simple client to add data into a relay.</p>
          <PrimaryButton copy="Create Supplier" link="/forum/create" className="mt-8 transition-transform transform hover:scale-105" />
        </div>

        {/* Forum List Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <ForumList />
        </div>
      </div>
    </main>
  );
}
