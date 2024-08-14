"use client";
import { useState } from "react";
import AddClientComponent, {
  TEmitAddClientSubmit,
} from "./components/add-client.component";
import ClientSocketComponent from "./components/client.component";

export default function Home() {
  const [client, setClient] = useState<TEmitAddClientSubmit[]>([]);
  const handleAddClient = (data: TEmitAddClientSubmit) => {
    setClient([...client, data]);
  };
  const handleDeleteClient = (id: number) => {
    const data = client.filter((item) => item.id !== id);
    setClient(data);
  };
  return (
    <main className="w-full h-full min-h-screen bg-slate-100 p-4 space-y-4">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold underline">
            Virtual Notification Client
          </h1>
          <AddClientComponent submit={handleAddClient} />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {client.map((item, index) => (
            <ClientSocketComponent
              key={index}
              id={item.id}
              onDelete={handleDeleteClient}
              info={item.info}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
