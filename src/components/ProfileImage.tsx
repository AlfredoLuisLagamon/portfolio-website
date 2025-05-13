import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileImageProps {
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden shadow-lg ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src="/images/Profile-Photo.jpg"
        alt="Alfred Lagamon's Profile Photo"
        width={400}
        height={400}
        className="w-full h-auto"
        priority
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50" />
    </motion.div>
  );
};

export default ProfileImage;
