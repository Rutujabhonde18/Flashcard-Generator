import { useState } from "react";
import jsPDF from "jspdf";
import {
  MdShare,
  MdDownload,
  MdPrint,
  MdClose,
  MdCopyAll,
} from "react-icons/md";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ShareModel = ({ currentGroup, currentCard }) => {
  const [showShareModel, setShowShareModel] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;

  // open
  const handleShare = () => {
    setShowShareModel(true);
  };

  // close
  const handleClose = () => {
    setShowShareModel(false);
    setCopied(false);
  };

  // copylink
  const handleCopy = async () => {
    try {
      // Modern browser
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;

        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy link:", error);
    }
  };

  // facebook
  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`,
      "_blank",
    );
  };

  // LinkedIn
  const handleLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl,
      )}`,
      "_blank",
    );
  };

  // WhatsApp
  const handleWhatsApp = () => {
    const text = `${currentGroup.title} - ${shareUrl}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Twitter
  const handleTwitter = () => {
    const text = currentGroup.title;

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    );
  };

  // Email
  const handleEmail = () => {
    const subject = currentGroup.title;

    const body = `${currentGroup.description}\n\n${shareUrl}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  // Download
  const handleDownload = () => {
    if (!currentGroup || !currentCard) return;

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // Group name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor("red");
    doc.text(currentGroup.title || "Flashcard Group", pageWidth / 2, 25, {
      align: "center",
    });

    // Group Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor("black");
    const groupDescription = doc.splitTextToSize(
      currentGroup.description || "",
      170,
    );
    doc.text(groupDescription, pageWidth / 2, 40, {
      align: "center",
    });

    // Term name
    const termY = 40 + groupDescription.length * 4 + 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor("green");
    doc.text(currentCard.term || "Flashcard", pageWidth / 2, termY, {
      align: "center",
    });

    // Term description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor("black");
    const definition = doc.splitTextToSize(
      currentCard.definition || "No description available",
      170,
    );
    doc.text(definition, pageWidth / 2, termY + 12, {
      align: "center",
    });

    // Term Image
    if (currentCard.image) {
      const imageY = termY + 20 + definition.length * 6;
      doc.addImage(currentCard.image, "JPEG", 55, imageY, 100, 65);
    }

    // Download pdf
    const fileName = `${currentGroup.title || "flashcard"}-${currentCard.term || "card"}.pdf`;
    doc.save(fileName);
  };

  // Print
  const handlePrint = () => {
    if (!currentGroup || !currentCard) return;
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
      <head>
      <title>${currentGroup.title}</title>
      <style>body { font-family: Arial; padding: 40px; }
          h1 { text-align: center; color: red; }
          .group { text-align: center; }
          h2 { text-align: center; color: green; margin-top: 30px; }
          .content { display: flex; gap: 30px; margin-top: 20px; }
          img { width: 45%; height: 220px; object-fit: cover; }
          .definition { width: 55%; line-height: 1.6; }</style>
      </head>
      <body>
      <h1>${currentGroup.title}</h1>
      <p>${currentGroup.description}</p>
      <h2>${currentCard.term}</h2>
      <div class="content ${!currentCard.image ? "no-image" : ""}"> ${currentCard.image ? `<img src="${currentCard.image}" alt="${currentCard.term}" />` : ""} <p class="definition">${currentCard.definition}</p> </div>
      </body>
      </html>
      `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="shadow-lg bg-white flex gap-5 w-full p-3 pl-7 rounded-lg text-gray-600 cursor-pointer border-2 border-gray-200 active:scale-95"
      >
        <MdShare size={24} /> <span>Share</span>
      </button>
      <button
        onClick={handleDownload}
        className="shadow-lg bg-white flex gap-5 w-full p-3 pl-7 rounded-lg text-gray-600 cursor-pointer border-2 border-gray-200 active:scale-95"
      >
        <MdDownload size={24} />
        <span>Download</span>
      </button>
      <button
        onClick={handlePrint}
        className="shadow-lg bg-white flex gap-5 w-full p-3 pl-7 rounded-lg text-gray-600 cursor-pointer border-2 border-gray-200 active:scale-95"
      >
        <MdPrint size={24} />
        <span>Print</span>
      </button>

      {/* Share Model */}
      {showShareModel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-md rounded-md bg-white p-10 shadow-2xl flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <MdClose size={22} />
            </button>
            <h2 className="text-lg font-semibold">Share</h2>

            {/* Link section */}
            <div className="text-gray-500 flex items-center border border-gray-200 rounded-md">
              <span className="text-sm px-3">Link</span>
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 outline-none text-sm text-gray-600 py-3"
              />

              {/* Copy */}
              <button
                onClick={handleCopy}
                className="pl-3 cursor-pointer hover:text-red-600 active:scale-110"
              >
                <MdCopyAll size={20} />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="px-3 cursor-pointer hover:text-red-600 active:scale-110"
              >
                <MdShare size={20} />
              </button>
            </div>

            {/* Copied msg */}
            {copied && <p className=" ml-2 text-green-600">Link copied</p>}

            {/* Social Icons */}
            <div className="flex mt-3 mx-3 justify-between">
              <button
                onClick={handleFacebook}
                className="text-blue-600 cursor-pointer active:scale-95 hover:scale-105"
              >
                <FaFacebookF size={22} />
              </button>
              <button
                onClick={handleLinkedIn}
                className=" text-blue-800 cursor-pointer active:scale-95 hover:scale-105"
              >
                <FaLinkedinIn size={22} />
              </button>
              <button
                onClick={handleWhatsApp}
                className="text-green-400 cursor-pointer active:scale-95 hover:scale-105"
              >
                <FaWhatsapp size={25} />
              </button>
              <button
                onClick={handleTwitter}
                className="text-gray-900 cursor-pointer active:scale-95 hover:scale-105"
              >
                <FaXTwitter size={22} />
              </button>
              <button
                onClick={handleEmail}
                className="text-gray-500 cursor-pointer active:scale-95 hover:scale-105"
              >
                <FaEnvelope size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModel;
