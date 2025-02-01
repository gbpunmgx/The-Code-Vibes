"use client";  // Add this directive at the top of the file

import { useState, useEffect } from "react";
import React from "react";
import SetUpSubFeaturesItem from "@/app/dashboard/components/SetUpSubFeaturesItem";
import { features, subFeatures } from "@/app/dashboard/models/FeaturesDataProvider";
import StickyHeader from "@/app/dashboard/components/StickyHeader";
import { Menu } from "lucide-react";

const DashboardPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isShow, setShow] = useState(true);
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
    const [activeFeature, setActiveFeature] = useState<string | null>(null);
    const [selectedSubFeature, setSelectedSubFeature] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
        setShow(true);
        if (!selectedFeature && features.length > 0) {
            const defaultFeature = features[0].id;
            setSelectedFeature(defaultFeature);
            setActiveFeature(defaultFeature);
            const defaultSubFeature = subFeatures[defaultFeature][0].id;
            setSelectedSubFeature(defaultSubFeature);
        }
    }, [features, subFeatures]);

    const handleFeatureClick = (featureId: string) => {
        setActiveFeature(featureId);
        setSelectedFeature(featureId);
        const defaultSubFeature = subFeatures[featureId][0]?.id || null;
        setSelectedSubFeature(defaultSubFeature);
    };

    const handleSubFeatureClick = (subFeatureId: string) => {
        setSelectedSubFeature(subFeatureId);
    };

    const showAndHideSubFeatures = (show: boolean) => {
        setShow(show);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="sticky top-0 w-20 bg-[#F0F4F7] text-black flex flex-col items-center p-4">
                <div
                    onClick={() => showAndHideSubFeatures(!isShow)}
                    className="relative group flex flex-col items-center justify-center mb-6 cursor-pointer hover:bg-gray-700 p-3 rounded-md transition-all ease-in-out duration-200"
                >
                    <div className="group-hover:text-white text-gray-800">
                        <Menu size={24} />
                    </div>
                </div>

                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className={`relative group flex flex-col items-center justify-center mb-6 cursor-pointer p-3 rounded-md transition-all ease-in-out duration-200 ${
                            selectedFeature === feature.id ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}
                        onClick={() => handleFeatureClick(feature.id)}
                        role="button"
                        aria-pressed={selectedFeature === feature.id}
                        aria-label={`Feature: ${feature.name}`}
                    >
                        <div
                            className={`${
                                selectedFeature === feature.id ? "text-white" : "group-hover:text-white text-gray-800"
                            }`}
                        >
                            {feature.icon}
                        </div>

                        {/* Tooltip shown only on hover */}
                        <div
                            className={`absolute left-20 bg-gray-700 text-white text-sm px-2 py-1 rounded-md group-hover:block ${
                                selectedFeature === feature.id ? "block" : "hidden"
                            }`}
                        >
                            {feature.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            {isShow && (
                <div className="sticky top-0 w-72 bg-white text-black p-6 flex flex-col border-r border-gray-300">
                    <div className="mb-6 flex items-center">
                        <h1 className="text-2xl font-bold">
                            MULTI{" "}
                            <span className="bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 bg-clip-text text-transparent text-4xl animate-glow">
                                X
                            </span>
                        </h1>
                    </div>
                    <h2 className="text-lg font-semibold mb-4 capitalize">{activeFeature}</h2>
                    <div className="flex flex-col gap-4">
                        {(subFeatures[activeFeature as keyof typeof subFeatures] || []).map((subFeature) => (
                            <button
                                key={subFeature.id}
                                className={`group flex items-center gap-4 p-3 rounded-md transition-all ease-in-out duration-200 ${
                                    selectedSubFeature === subFeature.id
                                        ? "bg-gray-700 text-white"
                                        : "hover:bg-gray-600 text-gray-800"
                                }`}
                                onClick={() => handleSubFeatureClick(subFeature.id)}
                                role="button"
                                aria-pressed={selectedSubFeature === subFeature.id}
                                aria-label={`Sub-feature: ${subFeature.name}`}
                            >
                                <div
                                    className={`rounded-md ${
                                        selectedSubFeature === subFeature.id
                                            ? "bg-gray-700 text-white"
                                            : "group-hover:bg-gray-700 group-hover:text-white text-gray-800"
                                    }`}
                                >
                                    {subFeature.icon}
                                </div>
                                <span
                                    className={`text-sm font-medium ${
                                        selectedSubFeature === subFeature.id
                                            ? "text-white"
                                            : "group-hover:text-white text-gray-800"
                                    }`}
                                >
                                    {subFeature.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Scrollable Content */}
            <div className="flex flex-col flex-grow">
                <StickyHeader />
                <div className="flex-grow bg-[#F0F4F7] p-8 m-4 rounded-2xl shadow-md overflow-y-auto">
                    <h1 className="text-3xl font-semibold text-black mb-6">
                        {`${activeFeature?.toUpperCase()} / ${selectedSubFeature?.toUpperCase()}`}
                    </h1>

                    {/* Scrollable component */}
                    <SetUpSubFeaturesItem selectedSubFeature={selectedSubFeature} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
