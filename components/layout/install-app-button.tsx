"use client";

import { Download, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone(): boolean {
  return window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone));
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    }

    function handleAppInstalled() {
      setInstalled(true);
      setInstallPrompt(null);
      toast.success("YaFoo added", { description: "Open it anytime from your app shortcuts." });
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstall() {
    if (installed) {
      toast("YaFoo is already installed", { description: "Open it from your home screen or app launcher." });
      return;
    }

    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
      }
      setInstallPrompt(null);
      return;
    }

    toast("Add YaFoo as a shortcut", {
      description: "Use your browser menu and choose Install app or Add to Home Screen.",
    });
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="relative flex size-11 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2"
      aria-label={installed ? "YaFoo is installed" : "Download YaFoo app"}
      title={installed ? "YaFoo is installed" : "Download YaFoo app"}
    >
      {installed ? <Smartphone className="size-[18px]" /> : <Download className="size-[18px]" />}
    </button>
  );
}
