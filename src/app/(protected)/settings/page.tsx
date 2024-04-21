// "use client";

// import * as z from "zod";

// import React, { useState, useTransition } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { auth } from "../../../../auth";
// import { logout } from "../../../../actions/logout";
// import { useCurrentUser } from "../../../../hooks/use-current-user";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { settings } from "../../../../actions/settings";
// import { useForm } from "react-hook-form";
// import { SettingsSchema } from "../../../../schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { FormError } from "@/components/FormError";
// import { FormSuccess } from "@/components/FormSuccess";
// import { Select } from "@radix-ui/react-select";
// import {
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { UserRole } from "@prisma/client";
// import { Switch } from "@/components/ui/switch";

// // for server component
// // const page = async () => {
// //   const session = await auth();

// //   return (
// //     <div className="w-full text-white text-center flex justify-center items-center p-6 flex-col h-screen gap-6">
// //       <h1 className="" style={{ textWrap: "balance", wordBreak: "break-all" }}>
// //         {JSON.stringify(session)}
// //       </h1>
// //       <form>
// //         <button className="bg-white p-2 rounded-lg px-5 text-black">
// //           Sign Out
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // for client component 1st way
// // const page = () => {
// //   const session = useSession();
// //   // for server component
// //   // const session = await auth();

// //   const handleLogout = async () => {
// //     signOut();
// //   };

// //   return (
// //     <div className="">
// //       {/* <h1 className="" style={{ textWrap: "balance", wordBreak: "break-all" }}>
// //         {JSON.stringify(session)}
// //       </h1> */}
// //       <form>
// //         <button
// //           onClick={handleLogout}
// //           className="bg-white p-2 rounded-lg px-5 text-black"
// //         >
// //           Sign Out
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // for client component in 2nd way
// // that is by doing with server actions
// const Page = () => {
//   const user = useCurrentUser();
//   console.log("user in settings", user);
//   const { update } = useSession();
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");

//   const form = useForm<z.infer<typeof SettingsSchema>>({
//     resolver: zodResolver(SettingsSchema),
//     defaultValues: {
//       password: undefined,
//       newPassword: undefined,
//       name: user?.name || undefined,
//       email: user?.email || undefined,
//       role: user?.role || undefined,
//       isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
//     },
//   });

//   const handleUpdate = (values: z.infer<typeof SettingsSchema>) => {
//     console.log("values in handleUpdate", values);
//     setError("");
//     setSuccess("");
//     startTransition(() => {
//       settings(values)
//         .then((data) => {
//           console.log("data", data);
//           if (!data.success) {
//             setError(data.message);
//           } else {
//             console.log("here");
//             update();
//             setSuccess(data.message);
//           }
//         })
//         .catch((err: any) => {
//           setError("Something went wrong");
//         });
//     });

//     // However it isn't changed when we go to client or server
//     // component in another route. To change that we need to update the
//     // session. There are two ways to do that. One is to udpate the token
//     // and session from auth.ts
//   };
//   return (
//     <Card className="w-[600px]">
//       <CardHeader>
//         <p className="text-2xl text-center font-semibold">⚓ Settings</p>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form
//             autoComplete="no"
//             className="space-y-6"
//             onSubmit={form.handleSubmit(handleUpdate)}
//           >
//             <div className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name:</FormLabel>
//                     <FormControl>
//                       <Input
//                         disabled={isPending}
//                         {...field}
//                         placeholder="john doe"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {!user?.isOauthEnabled && (
//                 <>
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email:</FormLabel>
//                         <FormControl>
//                           <Input
//                             disabled={isPending}
//                             {...field}
//                             placeholder="example@gmail.com"
//                             type="email"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Password:</FormLabel>
//                         <FormControl>
//                           <Input
//                             disabled={isPending}
//                             {...field}
//                             placeholder="******"
//                             type="password"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="newPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>New Password:</FormLabel>
//                         <FormControl>
//                           <Input
//                             disabled={isPending}
//                             {...field}
//                             placeholder="******"
//                             type="password"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </>
//               )}

//               <FormField
//                 control={form.control}
//                 name="role"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Role:</FormLabel>
//                     <Select
//                       disabled={isPending}
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a role"></SelectValue>
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value={UserRole.ADMIN}>
//                           {UserRole.ADMIN}
//                         </SelectItem>
//                         <SelectItem value={UserRole.USER}>
//                           {UserRole.USER}
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {!user?.isOauthEnabled && (
//                 <FormField
//                   control={form.control}
//                   name="isTwoFactorEnabled"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between rounded-lg ">
//                       <div>
//                         <FormLabel>Two-factor authentication:</FormLabel>
//                         <FormDescription>
//                           Enable two factor authentication for your account
//                         </FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch
//                           disabled={isPending}
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         ></Switch>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               )}
//             </div>
//             <FormError message={error} />
//             <FormSuccess message={success} />
//             <Button disabled={isPending} type="submit">
//               Save
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default Page;

import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;
