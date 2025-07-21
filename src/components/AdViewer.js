import React, { useState, useEffect, useRef } from 'react';

function AdViewer({ updateEarnings }) {
  const [adVisible, setAdVisible] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
  const adSlotRef = useRef(null); // Ref to attach Adsterra script

  const AD_PAYOUT = 0.005; // Example: $0.005 per ad view
  const VIEW_DURATION_SECONDS = 5; // How long user must view the ad

  const loadAd = () => {
    if (adLoading) return;
    setAdLoading(true);
    setAdWatched(false);
    setAdVisible(true);
    // Clear previous ad content if any
    if (adSlotRef.current) {
        adSlotRef.current.innerHTML = '';
    }

    // --- Adsterra Integration (Example - this is where you'd put their code) ---
    // For Banner or Social Bar:
    // You would paste the Adsterra JS snippet directly into your JSX,
    // or dynamically inject it. For `adSlotRef`, you'd use a banner code.

    // Example for a simple banner or native ad (replace with your actual Adsterra code):
    const adCode = `
      <div data-id-adsterra="YOUR_ADSTERRA_NATIVE_BANNER_ID" class="adsterra-native-banner"></div>
      <script>
        (function(d, s) {
          var js = d.createElement(s);
          js.src = "//www.profitablegate.com/a4/c8/e2/a4c8e2a4c8e2a4c8e2a4c8e2a4c8e2.js"; // Replace with Adsterra's actual script URL
          js.async = true;
          d.head.appendChild(js);
        })(document, 'script');
      </script>
    `;

    // For Popunder or Direct Link, these often don't need a specific 'slot'
    // but rather are triggered by clicks or page loads.
    // For Interstitial: often triggered by navigation or a user action.
    // Example:
    /*
    const interstitialScript = document.createElement('script');
    interstitialScript.src = "//pl12345.profitablegate.com/abc/def/interstitial.js"; // Replace with your Adsterra Interstitial URL
    interstitialScript.async = true;
    document.body.appendChild(interstitialScript);
    */

    // For this example, let's simulate a banner ad appearing
    if (adSlotRef.current) {
        adSlotRef.current.innerHTML = `
            <img src="https://via.placeholder.com/468x60?text=Your+Adsterra+Ad+Here" alt="Ad Placeholder" style="max-width:100%; height:auto;">
            <p style="font-size:0.8em; margin-top:10px;">(Simulated Adsterra Ad)</p>
        `;
        // In a real scenario, the Adsterra script would inject the actual ad content.
    }


    // Simulate ad viewing duration and reward
    setTimeout(() => {
      setAdWatched(true);
      setAdLoading(false);
      // In a real application, you'd send a request to your backend
      // to verify the ad view and update user earnings securely.
      // This front-end update is for demonstration only.
      updateEarnings(AD_PAYOUT);
      console.log('Ad watched and earnings updated!');
    }, VIEW_DURATION_SECONDS * 1000);
  };

  const showNextAd = () => {
    setAdVisible(false);
    setAdWatched(false);
    loadAd();
  };

  useEffect(() => {
    // Initial ad load when component mounts
    loadAd();
  }, []); // Run once on mount

  return (
    <div className="ad-viewer-container">
      <h2>Watch Ads & Earn!</h2>
      {adLoading && <p>Loading Ad...</p>}
      {adVisible && (
        <div className="ad-slot" ref={adSlotRef}>
            {/* Adsterra ad content will be injected here */}
            {!adLoading && !adWatched && <p>Ad is loading or failed to load. Please wait...</p>}
        </div>
      )}

      {adWatched && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>Ad viewed! Earnings added.</p>
      )}

      <button
        onClick={showNextAd}
        disabled={adLoading}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1.1em' }}
      >
        {adLoading ? 'Ad Playing...' : 'Watch Another Ad'}
      </button>
    </div>
  );
}

export default AdViewer;
