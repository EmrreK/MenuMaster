import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faQrcode,
	faFaceSmile,
	faHand,
	faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

function Features() {
	const features = [
		{
			name: "Instant Access to Menus",
			description:
				"Simply scan the QR code with your smartphone and get immediate access to our full menu—no downloads or extra apps required.",
			icon: <FontAwesomeIcon icon={faQrcode} size="xl" />,
		},
		{
			name: "Contactless and Hygienic",
			description:
				"Enjoy a fully contactless experience. Browse the menu and order directly from your device, ensuring a safer and more hygienic dining environment.",
			icon: <FontAwesomeIcon icon={faHand} size="xl" />,
		},
		{
			name: "User-Friendly Interface",
			description:
				"Our menus are designed with simplicity in mind. Easy navigation, clear item descriptions, and vibrant images make it simple to find exactly what you’re craving.",
			icon: <FontAwesomeIcon icon={faFaceSmile} size="xl" />,
		},
		{
			name: " Real-Time Updates",
			description:
				"Our QR code menus are always up-to-date, showing real-time availability and special promotions so you're never out of the loop.",
			icon: <FontAwesomeIcon icon={faArrowsRotate} />,
		},
	];

	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="text-base font-semibold leading-7 text-indigo-600">
						Deploy faster
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						"The Future of Dining at Your Fingertips"
					</p>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Discover the ease and convenience of our QR code menus.
						No apps, no hassle—just scan, explore, and enjoy! See
						how we’ve made dining faster, more interactive, and
						perfectly suited to your lifestyle.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{features.map((feature) => (
							<div key={feature.name} className="relative pl-16">
								<dt className="text-base font-semibold leading-7 text-gray-900">
									<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
										{feature.icon}
									</div>
									{feature.name}
								</dt>
								<dd className="mt-2 text-base leading-7 text-gray-600">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}

export default Features;
