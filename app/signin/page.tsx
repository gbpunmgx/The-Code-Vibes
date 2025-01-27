"use client";
import Link from 'next/link';
import React from "react";

export default function HomePage() {
    return <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div
                className="flex-1 bg-indigo-100 text-center hidden lg:flex justify-center items-center transition-all duration-500">
                <div className="text-black text-4xl font-semibold">
                    <p>Join us today!</p>
                    <p>Start your journey with us.</p>
                </div>
            </div>

            <div
                className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col items-center justify-center transition-transform duration-500">
                <div>
                    <div className="mb-6 flex items-center">
                        <h1 className="text-2xl font-bold text-black mb-6">
                            MULTI{" "}
                            <span
                                className="bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 bg-clip-text text-transparent text-4xl animate-glow">
                X
              </span>
                        </h1>
                    </div>
                </div>

                <div className=" flex flex-col items-center">
                    <div className="w-full flex-1 mt-8">
                        <div className="mx-auto max-w-xs">
                            <>
                                <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-900">
                                    Sign In
                                </h1>

                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email"
                                    placeholder="Email"
                                />

                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    placeholder="Password"
                                />

                                <a
                                    href="#"
                                    className="text-sm text-indigo-500 hover:text-indigo-700 mt-2 block"
                                >
                                    Forgot your password?
                                </a>

                                <Link href="/dashboard">
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                                            <circle cx="8.5" cy="7" r="4"/>
                                            <path d="M20 8v6M23 11h-6"/>
                                        </svg>
                                        <span className="ml-3">Sign In</span>
                                    </button>
                                </Link>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
