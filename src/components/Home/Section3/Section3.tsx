"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import CategoryChip from "./CategoryChip";
import ServiceCard from "@/shared/ServiceCard";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ICategory } from "@/redux/types";

const Section3 = ({
    initialCategories: serviceCategories = [],
}: {
    initialCategories: ICategory[];
}) => {
    const categoriesWithServices = serviceCategories.filter(
        (cat) => !cat.services || cat.services.length > 0
    );

    return (
        <section className="py-6 md:py-12 container overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-230 text-center"
            >
                <h2 className="text-3xl leading-[1.2] font-semibold text-black dark:text-white sm:text-3xl lg:text-4xl font-montserrat">
                    Available Services
                </h2>
                <p className="mt-4 text-base text-text-blue dark:text-sky-400 sm:text-base font-montserrat max-w-lg mx-auto">
                    Explore our wide range of services designed to meet your needs and help you achieve your goals.
                </p>
            </motion.div>

            {/* 1st: All Categories by Slide */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 sm:mt-8"
            >
                <CategoryChip categories={serviceCategories} />
            </motion.div>

            {/* 2nd: Services grouped by Category List (with Carousel) */}
            <div className="mt-8 lg:mt-12 space-y-10 sm:space-y-14">
                {categoriesWithServices.map((category) => (
                    <div key={category.id || category.name} className="space-y-5 sm:space-y-6">
                        {/* Category Header: Name on left, View All button on right */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3.5"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="h-6 sm:h-7 w-1.5 rounded-full bg-primary shrink-0" />
                                <div className="min-w-0">
                                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-montserrat truncate">
                                        {category.name}
                                    </h3>
                                    {category.description && (
                                        <p className="mt-0.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-montserrat line-clamp-1">
                                            {category.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="shrink-0 rounded-full px-4 py-2 border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary text-primary hover:text-white font-montserrat font-semibold text-xs sm:text-sm transition-all duration-200 gap-1.5 group cursor-pointer"
                            >
                                <Link href={`/shop?category=${encodeURIComponent(category.name)}`}>
                                    <span>View All</span>
                                    <ArrowRight className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Category Services Carousel */}
                        <div className="relative">
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: false,
                                }}
                                className="w-full group/carousel"
                            >
                                <CarouselContent className="-ml-4 sm:-ml-5 py-1">
                                    {category.services?.map((service, index) => (
                                        <CarouselItem
                                            key={service.id || service.slug}
                                            className="pl-4 sm:pl-5 basis-[85%] xs:basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 24 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{
                                                    duration: 0.55,
                                                    delay: Math.min(index * 0.06, 0.3),
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                className="h-full"
                                            >
                                                <ServiceCard service={service} className="h-full" />
                                            </motion.div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                <CarouselPrevious
                                    variant="outline"
                                    size="icon"
                                    className="left-2 sm:left-3 top-1/2 -translate-y-1/2 size-9 sm:size-10 rounded-full bg-white/95 dark:bg-zinc-900/95 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-primary hover:text-white hover:border-primary shadow-md backdrop-blur-xs transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none z-10 cursor-pointer"
                                >
                                    <ChevronLeft className="size-5" />
                                </CarouselPrevious>

                                <CarouselNext
                                    variant="outline"
                                    size="icon"
                                    className="right-2 sm:right-3 top-1/2 -translate-y-1/2 size-9 sm:size-10 rounded-full bg-white/95 dark:bg-zinc-900/95 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-primary hover:text-white hover:border-primary shadow-md backdrop-blur-xs transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none z-10 cursor-pointer"
                                >
                                    <ChevronRight className="size-5" />
                                </CarouselNext>
                            </Carousel>
                        </div>
                    </div>
                ))}
            </div>

            {/* Centered See All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-10 flex justify-center"
            >
                <Button
                    asChild
                    size="lg"
                    variant={"outline"}
                    className="rounded-full px-8 py-3 border-primary hover:bg-primary/90 text-text-blue hover:text-white font-montserrat font-semibold text-base shadow-sm hover:shadow-lg transition-all duration-300 gap-2 cursor-pointer"
                >
                    <Link href="/shop">
                        <span>See All</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </motion.div>
        </section>
    );
};

export default Section3;