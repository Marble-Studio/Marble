import React, { useState } from "react";
import Animate from "../Components/Animate";
import { NavLink, Outlet } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import coinsmall from "../images/coinsmall.webp";
import { useUser } from "../context/userContext";
import whatsapp from "../images/whatsapp.svg";
import twitter from "../images/twitter.svg";
import telegram from "../images/telegram.svg";
import facebook from "../images/facebook.svg";
import { RxArrowRight } from "react-icons/rx";

const Ref = () => {
  const { id, refBonus, referrals, loading } = useUser();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const reflink = `https://t.me/Marblegame_bot?start=r${id}\n\Marble tokens mining is live! Two is better than one! Join my squad, and let\'s double the fun (and earnings 🤑)! Marble Power Tap! 🚀`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(reflink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 10000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = reflink;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const formatNumber = (num) => {
    if (num < 1000000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
      return (num / 1000000).toFixed(3).replace(".", ",") + " M";
    }
  };
  
  
  

  const handleShare = async () => {
    const shareData = {
      title: "Mine Marble tokens now!",
      url: `https://t.me/Marblegame_bot?start=r${id}`,
      text: "Marble tokens mining is live! Join my squad, and let's double the fun (and earnings 🤑)! Marble Power Tap! 🚀",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      fallbackShare(shareData);
    }
  };

  const fallbackShare = (shareData) => {
    const encodedText = encodeURIComponent(
      `${shareData.url} \n\Marble tokens mining is live! Two is better than one! Join my squad, and let\'s double the fun (and earnings 🤑)! Marble Power Tap! 🚀`
    );
    const encodedUrl = encodeURIComponent(shareData.url);

    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    const telegramUrl = `https://telegram.me/share/url?text=${encodedText}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    const fallbackOptions = [
      { name: "WhatsApp", url: whatsappUrl, icon: whatsapp },
      { name: "Telegram", url: telegramUrl, icon: telegram },
      { name: "Twitter", url: twitterUrl, icon: twitter },
      { name: "Facebook", url: facebookUrl, icon: facebook },
    ];

    const optionsHtml = fallbackOptions
      .map(
        (option) =>
          `<li key="${option.name}" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <a href="${option.url}" target="_blank" rel="noopener noreferrer">
              <img alt="share icon" src=${option.icon} width="50px"/>
            </a>
            <span style="font-size: 12px;color: #000;padding-top: 4px;font-weight: 500;">${option.name}</span>
          </li>`
      )
      .join("");

    const fallbackHtml = `
      <div id="fallback-share-popup" style="z-index:40;position: fixed;top: 0;background:#0000007d;left: 0;right: 0;bottom: 0;display: flex;justify-content: center; align-items: start;flex-direction: column;"> 
        <div id="close-popup-button" style="width: 100%;height: 70%;"></div>
        <div style="background: #fff;padding: 20px 24px;width: 100%;box-shadow: 0 0 10px rgba(0,0,0,0.1);height: 30%;border-top-right-radius: 16px;border-top-left-radius:16px">
          <h3 style="font-size: 18px;font-weight: 600;color: #313131;padding-bottom: 12px;text-align: center;">Share via</h3>
          <ul style="display: flex;justify-content: space-between;gap: 10px">
            ${optionsHtml}
          </ul>
          <div style="width: 100%;padding: 30px 10px 0;display: flex;justify-content: center;">
            <button id="close-popup-button2" style="background: #000000d4;padding: 6px 14px;font-weight: 500;border-radius: 6px;">Close</button>
          </div>
        </div>
      </div>
    `;

    const fallbackPopup = document.createElement("div");
    fallbackPopup.innerHTML = fallbackHtml;
    document.body.appendChild(fallbackPopup);

    document.getElementById("close-popup-button").onclick = () => {
      document.getElementById("fallback-share-popup").remove();
    };
    document.getElementById("close-popup-button2").onclick = () => {
      document.getElementById("fallback-share-popup").remove();
    };
  };

  return (
    <>
      <Animate>
        <div className="w-full pt-3 justify-center flex-col space-y-4 px-6 bg-gradient-to-b from-black via-gray-900 to-blue rounded-lg shadow-xl">
          <div className="w-full">
            <h1 className="font-semibold text-[20px] text-[#ffffff] pb-2">
            Get 20% of your friends' income
            </h1>
            <p className="text-[16px] font-medium text-yellow-400">+50,000 For you and your friend</p>

          </div>

          <div className="w-full flex items-center justify-between space-x-4 pb-4">
            <button
              onClick={handleShare}
              className="w-[65%] flex space-x-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium text-[15px] h-[50px] rounded-lg px-5 items-center justify-center hover:opacity-90 transition ease-in-out duration-200"
            >
              <MdOutlineFileUpload size={20} />
              <span>Share Invite Link</span>
            </button>
            <button
              onClick={copyToClipboard}
              className="w-[35%] flex space-x-2 bg-gray-800 text-white font-medium text-[15px] h-[50px] rounded-lg px-4 items-center justify-center hover:opacity-80 transition ease-in-out duration-200"
            >
              <FaLink size={18} />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="w-full flex items-center justify-between space-x-4 pb-4">
            <div className="w-[48.5%] flex flex-col bg-gray-900 text-white font-medium text-[15px] h-[85px] rounded-lg px-5 py-3 justify-between">
              <h2 className="text-[22px]">{loading ? "Checking..." : `${referrals.length} Friends`}</h2>
              <p className="text-[11px] text-[#7d7d7d]">Invite friends to earn rewards!</p>
            </div>
            <div className="w-[48.5%] flex flex-col bg-gray-900 text-white font-medium text-[15px] h-[85px] rounded-lg px-5 py-3 justify-between">
              <h2 className="text-[22px]">{formatNumber(refBonus)} Marble</h2>
              <p className="text-[11px] text-[#7d7d7d]">Earn 20% of your friends' earnings!</p>
            </div>
          </div>
 

          <div id="refer" className="w-full h-[55vh] scroller rounded-lg overflow-y-auto pt-2 pb-8 bg-gray-900 shadow-inner">
            <div className="w-full flex flex-col space-y-4">
              {loading ? (
                <p className="text-[#b0b0b0] w-full text-center">Checking...</p>
              ) : referrals.length === 0 ? (
                <p className="text-[#b0b0b0] text-center pt-8 px-6">
                  You have no friends yet. Invite your friends and family to earn rewards!
                </p>
              ) : (
                referrals.map((user, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center shadow-md">
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-[16px]">{user.username}</span>
                      <div className="flex items-center space-x-2 text-[14px] text-blue-400">
             
                        <img src={coinsmall} alt="Coin" className="w-[16px]" />
                        <span>{formatNumber(user.balance)}</span>
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold">+{formatNumber((user.balance / 100) * 10)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </Animate>
    </>
  );
};

export default Ref;
