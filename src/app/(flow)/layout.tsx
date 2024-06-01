"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { ReactFlowProvider } from "reactflow";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      
      <ReactFlowProvider>
        <div className="flex">
        <Sidebar/> 
        {children}
        </div>
        
        </ReactFlowProvider>
       
    </div>
  );
}
