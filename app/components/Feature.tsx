import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faBarsStaggered,
  faMobile,
  faShield,
  faHandsHoldingCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

export default function Feature() {
  return (
    <section id="features" className="py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold tracking-tight text-center mb-5">
            The future of AI.
          </h1>
          <p className="text-xl leading-normal text-center text-gray-700 max-w-2xl mb-10">
            HollywoodAI is designed to help you enjoy high-quality summaries
            instantly, without breaking a sweat.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-4 group">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                  <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    AI Generated Summaries
                  </h4>
                  <p className="text-sm leading-6 text-gray-600">
                    Save time with summaries of the world's best movies.
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="p-4 group">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                  <FontAwesomeIcon icon={faCirclePlay} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Read or Listen
                  </h4>
                  <p className="text-sm leading-6 text-gray-600">
                    Switch between reading and listening modes seamlessly.
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="p-4 group">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                  <FontAwesomeIcon icon={faBarsStaggered} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Find Your Next Flick
                  </h4>
                  <p className="text-sm leading-6 text-gray-600">
                    Explore our movie lists and personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="p-4 group">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                  <FontAwesomeIcon icon={faMobile} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Multi Platform Access
                  </h4>
                  <p className="text-sm leading-6 text-gray-600">
                    Enjoy your favourite movies on any device.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-4 group">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                  <FontAwesomeIcon icon={faShield} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Payment Gateways
                  </h4>
                  <p className="text-sm leading-6 text-gray-600">
                    We securely process all card payments.
                  </p>
                </div>
              </div>
            </div>
            {/* Feature 6 */}
            <div className="p-4 group">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                  <FontAwesomeIcon
                    icon={faHandsHoldingCircle}
                    className="w-4 h-4"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Eco-Friendly Option
                  </h4>
                  <p className="text-sm leading-6 text-gray-600">
                    HollywoodAI donates 10% of profits to charities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
