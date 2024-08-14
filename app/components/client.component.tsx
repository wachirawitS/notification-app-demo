"use client";
import React, { useEffect, useState } from "react";
import { IClientSocketComponent } from "../interface/client.interface";
import io, { Socket } from "socket.io-client";
import { toast } from "@/components/ui/use-toast";

const ClientSocketComponent = ({
  id,
  info,
  onDelete,
}: IClientSocketComponent) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messageZoneRoom, setMessageZoneRoom] = useState<any>({});
  const [messageStoreRoom, setMessageStoreRoom] = useState<any>({});
  const [messageMachineRoom, setMessageMachineRoom] = useState<any>({});
  useEffect(() => {
    const newSocket = io(info.socketUrl);
    setSocket(newSocket);

    // define room
    const zoneRoom = `Z${info.zoneId}`;
    const storeRoom = `S${info.storeId}`;
    const machineRoom = `M${info.machineId}`;

    newSocket.on("connect", () => {
      // join room when connect
      newSocket.emit("join-rooms", [zoneRoom, storeRoom, machineRoom]);
    });

    // subscribe message zone, store, machine respectively
    newSocket.on(`messageRoom${zoneRoom}`, (msg: any) => {
      setMessageZoneRoom(msg);
    });

    newSocket.on(`messageRoom${storeRoom}`, (msg: any) => {
      setMessageStoreRoom(msg);
    });

    newSocket.on(`messageRoom${machineRoom}`, (msg: any) => {
      setMessageMachineRoom(msg);
    });

    return () => {
      console.log(`${info.machineId} is disconected`);
      toast({
        title: "Socket disconnect",
        description: `machineId: ${info.machineId} is disconected`,
      })
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="w-full bg-white border shadow-sm rounded overflow-hidden">
      {/* Head */}
      <div className="grid grid-cols-7 text-sm border-b bg-black text-white">
        <div className="col-span-2 p-2 border-r">
          <p>
            zoneId: <span className="font-semibold">{info.zoneId}</span>
          </p>
        </div>
        <div className="col-span-2 p-2 border-r">
          <p>
            storeId: <span className="font-semibold">{info.storeId}</span>
          </p>
        </div>
        <div className="col-span-2 p-2 border-r">
          <p>
            machineId: <span className="font-semibold">{info.machineId}</span>
          </p>
        </div>
        <button
          onClick={() => {
            if (onDelete) {
              onDelete(id);
            }
          }}
          className="col-span-1 p-2"
          type="button"
        >
          X
        </button>
      </div>
      <div className="p-2 border-b">
        socketUrl: <span className="font-bold text-amber-600">{info.socketUrl}</span>
      </div>
      <div className="text-sm">
        <pre className="p-2 border-b">
          zoneRoom: {JSON.stringify(messageZoneRoom, null, 2)}
        </pre>
        <pre className="p-2 border-b">
          storeRoom: {JSON.stringify(messageStoreRoom, null, 2)}
        </pre>
        <pre className="p-2">
          machineRoom: {JSON.stringify(messageMachineRoom, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ClientSocketComponent;
