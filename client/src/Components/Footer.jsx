import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faM} from "@fortawesome/free-solid-svg-icons";
function Footer() {
	return (
		<div>
			<footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
				<a href="#home">
					<FontAwesomeIcon icon={faM} size="2x" />
				</a>

				<aside>
					<p className="font-bold">
						MenuMaster
						<br />
						Providing reliable tech since 2024
					</p>
					<p>
						Copyright © {new Date().getFullYear()} - All right
						reserved
					</p>
				</aside>

				<nav>
					<div className="grid grid-flow-col gap-4">
						<a href="https://github.com/Twister686/MenuMaster">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								width="30"
								height="30"
							>
								<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.18-.01-.76-.01-1.37-2.24.49-2.71-1.08-2.71-1.08-.37-.95-.9-1.2-.9-1.2-.73-.5 0-.49 0-.49.81.06 1.23.83 1.23.83.72 1.22 1.89.87 2.35.67.07-.52.28-.87.5-1.07-1.77-.2-3.63-.89-3.63-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.83.64-.18 1.33-.27 2.02-.27.69 0 1.38.09 2.02.27 1.53-1.05 2.2-.83 2.2-.83.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.86 3.75-3.63 3.95.3.26.58.78.58 1.57 0 1.13-.01 2.04-.01 2.31 0 .21.15.46.55.38C13.71 14.54 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
							</svg>
						</a>
					</div>
				</nav>
			</footer>
		</div>
	);
}

export default Footer;
