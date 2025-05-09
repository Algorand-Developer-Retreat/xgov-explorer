"use client";

import GlobalModalProvider from "@/providers/global-modal-provider";
import Web3AVMProvider from "@/providers/web3/avm-provider";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/providers/user-provider";
import { ProposalsProvider } from "@/providers/proposals-provider";


export function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <ProposalsProvider>
                        <Web3AVMProvider>
                            <UserProvider>
                                {children}
                            </UserProvider>
                        </Web3AVMProvider>
                    </ProposalsProvider>
                </SessionProvider>
            </QueryClientProvider>
        </>
    );
}

export function UIProviders({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            value={{ light: "light", dark: "dark" }}
            defaultTheme="dark"
        >
            <Toaster
                style={{ zIndex: 9999 }}
                toastOptions={{
                    unstyled: true,
                    duration: 5000,
                    classNames: {
                        toast: "rust-toaster",
                    },
                }}
            />
            <GlobalModalProvider>
                {children}
            </GlobalModalProvider>
        </ThemeProvider>
    );
}
