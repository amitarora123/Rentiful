"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Calendar, Heart, PencilIcon } from "lucide-react";
const features = [
  {
    title: "Trustworthy and Verified Listings",
    description:
      "Discover the best rental options with user reviews and ratings.",
    image: "/feature1.png",
    buttonText: "Explore",
  },
  {
    title: "Browse Rental Listings with Ease",
    description:
      "Get Access to user reviews and ratings for a better understanding of rental options.",
    image: "/feature2.png",
    buttonText: "Search",
  },
  {
    title: "Simplify Your Rental Search with Advanced Filters",
    description:
      "Find trustworthy and verified rental listings to ensure a hassle-free experience.",
    image: "/feature3.png",
    buttonText: "Discover",
  },
];

const discover = [
  {
    title: "Search for Properties",
    description:
      "Browse through our extensive collection of rental properties in your desired location.",
    Icon: PencilIcon,
  },
  {
    title: "Book Your Rental",
    description:
      "Once you've found the perfect rental property, easily book it online with just a few clicks.",
    Icon: Calendar,
  },
  {
    title: "Enjoy your New Home",
    description:
      "Move into your new rental property and start enjoying your dream home.",
    Icon: Heart,
  },
];
const Feature = () => {
  return (
    <div className="min-h-screen px-10 w-full bg-white">
      <h1 className="text-2xl my-10 max-w-2xl mx-auto font-bold text-center">
        Quickly find the home you want using our effective search filters!
      </h1>
      <div className="my-10">
        <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.3, // delay per item
                duration: 0.6,
                ease: "easeInOut",
              }}
              viewport={{ once: true, amount: 0.4 }}
              key={index}
              className="flex opacity-0 flex-col items-center text-center p-5 gap-3 "
            >
              <Image
                src={feature.image}
                alt={feature.title}
                width={200}
                height={200}
                className="object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold ">{feature.title}</h2>
              <p className="text-sm text-gray-600">{feature.description}</p>
              <button className="border border-slate-400 text-xs p-3">
                {feature.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-30 mb-10">
        <div className="text-center max-w-xl md:max-w-3xl mx-auto flex gap-2 flex-col my-10">
          <h2 className="text-primary-700 font-bold text-2xl">Discover</h2>
          <p className="text-primary-700">
            Find your Dream Rental Property Today
          </p>
          <p className="text-xs">
            Searching for your dream rental property has never been easier. With
            our user-friendly search feature. you can quickly find the perfect
            home that meets all your needs. Start your search today and discover
            your dream rental property!
          </p>
        </div>
        <div className="grid md:grid-cols-2 max-w-xl lg:grid-cols-3 gap-5 md:max-w-5xl mx-auto">
          {discover.map(({ Icon, description, title }, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.3, // delay per item
                duration: 0.6,
                ease: "easeInOut",
              }}
              viewport={{ once: true, amount: 0.4 }}
              key={index}
              className="flex opacity-0 pt-10 pb-20 rounded-xl flex-col shadow-md items-center text-center p-5 gap-3 "
            >
              <div className="bg-primary-700 p-2 rounded-full">
                <Icon className="size-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold ">{title}</h2>
              <p className="text-sm text-gray-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
