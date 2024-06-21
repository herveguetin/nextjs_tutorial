import Image from 'next/image';

export default function ResponsiveImage(
  {
    desktop,
    mobile,
    alt
  }: { desktop: { src: string, width: number, height: number }; mobile: { src: string, width: number, height: number }; alt: string }) {
  return (
    <div>
      <Image
        src={desktop.src}
        alt={alt}
        className="hidden md:block"
        width={desktop.width}
        height={desktop.height}
      />
      <Image
        src={mobile.src}
        alt={alt}
        className="block md:hidden"
        width={mobile.width}
        height={mobile.height}
      />
    </div>
  );
}
