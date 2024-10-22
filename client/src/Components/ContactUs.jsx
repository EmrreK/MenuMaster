import React, {useState} from "react";

function ContactUs() {
	const [agreed, setAgreed] = useState(false);

	return (
		<div
			id="contact"
			className=" isolate bg-stone-100 dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8"
		>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
				/>
			</div>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					Contact Us
				</h2>
				<p className="mt-2 text-lg leading-8 text-gray-600">
					"For inquiries, support, or feedback, please don't hesitate
					to contact us."
				</p>
			</div>
			<form
				action="#"
				method="POST"
				className="mx-auto mt-16 max-w-xl sm:mt-20"
			>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					{["first-name", "last-name", "company", "email"].map(
						(field, index) => (
							<div
								key={index}
								className={
									field === "company" || field === "email"
										? "sm:col-span-2"
										: ""
								}
							>
								<label
									htmlFor={field}
									className="block text-sm  font-semibold leading-6 text-gray-900 dark:text-white"
								>
									{field
										.replace("-", " ")
										.replace(/(?:^|\s)\S/g, (a) =>
											a.toUpperCase()
										)}
								</label>
								<div className="mt-2.5 ">
									<input
										id={field}
										name={field}
										type={
											field === "email" ? "email" : "text"
										}
										autoComplete={
											field === "email"
												? "email"
												: field === "company"
												? "organization"
												: "given-name"
										}
										className=" bg-white block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						)
					)}
					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Message
						</label>
						<div className="mt-2.5">
							<textarea
								id="message"
								name="message"
								rows={4}
								className="bg-white block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								defaultValue={""}
							/>
						</div>
					</div>
					<div className="flex gap-x-4 sm:col-span-2">
						<div className="bgflex h-6 items-center">
							<input
								type="checkbox"
								checked={agreed}
								onChange={() => setAgreed(!agreed)}
								className="cursor-pointer h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
							/>
						</div>
						<label className="text-sm leading-6 text-gray-600">
							By selecting this, you agree to our{" "}
							<a
								href=" "
								className="font-semibold text-indigo-600"
							>
								privacy policy
							</a>
							.
						</label>
					</div>
				</div>
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Let's talk
					</button>
				</div>
			</form>
		</div>
	);
}

export default ContactUs;
