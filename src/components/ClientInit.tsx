"use client";
import { useEffect } from "react";

export default function ClientInit() {
  useEffect(() => {
    // Hide loading screen
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }, 1500);
    }

    // Scroll to top button visibility
    const scrollBtn = document.getElementById("scrollTopBtn");
    const handleScroll = () => {
      if (scrollBtn) {
        scrollBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
        scrollBtn.style.visibility = window.scrollY > 300 ? "visible" : "hidden";
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // AOS-like scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll("[data-aos]").forEach(el => observer.observe(el));

    // Contact form submit
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (res.ok) {
            alert("Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.");
            form.reset();
          }
        } catch {
          alert("Gagal mengirim pesan. Silakan coba lagi.");
        }
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
