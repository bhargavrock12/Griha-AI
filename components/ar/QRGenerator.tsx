import React from 'react';

interface QRGeneratorProps {
  url: string;
  size?: number;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ url, size = 200 }) => {
  // Use a lightweight QR image API to avoid adding dependencies
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    url
  )}&qzone=1&bgcolor=FBF9F6&color=5C524C&margin=0`;

  return (
    <img
      src={qrSrc}
      width={size}
      height={size}
      alt="QR code to open AR on mobile"
      className="border border-border-main rounded-md"
    />
  );
};

export default QRGenerator;


