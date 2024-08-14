"use client";
import React from "react";
import { IClientInfo } from "../interface/client.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export type TEmitAddClientSubmit = {
  id: number;
  info: IClientInfo;

};

type Props = {
  submit(emitData: TEmitAddClientSubmit): void;
};

const addClientformSchema = z.object({
  zoneId: z.string().min(1, {
    message: "zone id is required",
  }),
  storeId: z.string().min(1, {
    message: "store id is required",
  }),
  machineId: z.string().min(1, {
    message: "machine id is required",
  }),
  socketUrl: z.string().min(1, {
    message: "service url is required",
  }),
});

export type AddClientFormSchema = z.infer<typeof addClientformSchema>;

const AddClientComponent = ({ submit }: Props) => {
  const form = useForm<AddClientFormSchema>({
    resolver: zodResolver(addClientformSchema),
    defaultValues: {
      machineId: "",
      storeId: "",
      zoneId: "",
      socketUrl: "http://localhost:"
    },
  });
  const onSubmit = (values: AddClientFormSchema) => {
    submit({ id: Date.now(), info: values });
    form.reset();
    toast({
      title: "Add Socket Client Success",
      description: `machineId: ${values.machineId}, storeId: ${values.storeId}, zoneId: ${values.zoneId}`,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("flex items-center space-x-2")} variant="outline">
          <CirclePlus className="w-4 h-5" />
          <p>Client Socket</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>New Client Socket</DialogTitle>
              <DialogDescription>Fill client information</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="zoneId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZoneID :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="storeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>StoreID :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="machineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MachineID :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socketUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SocketUrl :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientComponent;
