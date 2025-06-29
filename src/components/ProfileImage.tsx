import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileImageProps {
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      role="img"
      aria-label="Professional profile photo of Alfredo Luis Lagamon"
    >
      <Image
        src="/images/Profile-Photo.jpg"
        alt="Alfredo Luis Lagamon - Full Stack Developer and Web Designer. Professional headshot showing a confident developer ready to tackle challenging projects with modern web technologies."
        width={400}
        height={400}
        className="w-full h-auto"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmNWY5Ij48L3N2Zz4="
      />

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50" 
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default ProfileImage;
