import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";

function Settings({setShowForm}) {
	const [banner, setBanner] = useState(null);
	const [profilePicture, setProfilePicture] = useState(null);

	const [settings, setSettings] = useState({});
	const [editSettings, setEditSettings] = useState({});

	const handleSaveSettings = async () => {
		try {
			await axios.put("/api/settings", editSettings);
			fetchSettings();
		} catch (err) {
			console.error("Failed to save settings", err);
		}

		setShowForm("renderProduct");
	};

	const handleBannerUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setBanner(URL.createObjectURL(file));
		}
	};

	const handleProfilePictureUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfilePicture(URL.createObjectURL(file));
		}
	};

	const fetchSettings = async () => {
		try {
			const {data: settingsData} = await axios.get("/api/settings");
			setSettings(settingsData);
		} catch (err) {
			console.error("Failed to fetch categories:", err);
		}
	};

	useEffect(() => {
		fetchSettings();
	}, []);

	return (
		<div className="p-6 flex justify-center items-center">
			<div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl">
				<h2 className="text-2xl font-bold mb-6">Menu Page Settings</h2>

				{/* Location */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">Location</h3>
					<input
						type="text"
						value={editSettings.location || ""}
						onChange={(e) =>
							setEditSettings({
								...editSettings,
								location: e.target.value,
							})
						}
						placeholder="Enter your location"
						className="w-full p-2 border border-gray-300 rounded-lg"
					/>
				</div>

				{/* Currency */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">Currency</h3>
					<select
						value={editSettings.currency || ""}
						onChange={(e) =>
							setEditSettings({
								...editSettings,
								currency: e.target.value,
							})
						}
						className="w-full p-2 border border-gray-300 rounded-lg"
					>
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
						<option value="GBP">GBP</option>
						<option value="TRY">TRY</option>
						<option value="JPY">JPY</option>
					</select>
				</div>

				{/* Social Media Links */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">Social Media Links</h3>

					<input
						type="text"
						value={editSettings.facebook || ""}
						onChange={(e) =>
							setEditSettings({
								...editSettings,
								facebook: e.target.value,
							})
						}
						placeholder={"Facebook URL"}
						className="w-full p-2 border border-gray-300 rounded-lg mb-2"
					/>

					<input
						type="text"
						value={editSettings.instagram || ""}
						onChange={(e) =>
							setEditSettings({
								...editSettings,
								instagram: e.target.value,
							})
						}
						placeholder={"Instagram URL"}
						className="w-full p-2 border border-gray-300 rounded-lg mb-2"
					/>

					<input
						type="text"
						value={editSettings.twitter || ""}
						onChange={(e) =>
							setEditSettings({
								...editSettings,
								twitter: e.target.value,
							})
						}
						placeholder={"Twitter URL"}
						className="w-full p-2 border border-gray-300 rounded-lg mb-2"
					/>
				</div>

				{/* Banner Upload */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">Upload Banner</h3>
					<input
						value={editSettings.banner || ""}
						type="file"
						onChange={(e) => {
							handleBannerUpload(e);
							setEditSettings({
								...editSettings,
								banner: URL.createObjectURL(e.target.files[0]),
							});
						}}
						className="w-full p-2 border border-gray-300 rounded-lg"
					/>
					{banner && (
						<img
							src={banner}
							alt="Banner Preview"
							className="w-full mt-4 rounded-lg"
						/>
					)}
				</div>

				{/* Profile Picture Upload */}
				<div className="mb-4">
					<h3 className="text-lg font-medium">
						Upload Profile Picture
					</h3>
					<input
						value={editSettings.profilePicture || ""}
						type="file"
						onChange={(e) => {
							handleProfilePictureUpload(e);
							setEditSettings({
								...editSettings,
								profilePicture: URL.createObjectURL(
									e.target.files[0]
								),
							});
						}}
						className="w-full p-2 border border-gray-300 rounded-lg"
					/>
					{profilePicture && (
						<img
							src={profilePicture}
							alt="Profile Preview"
							className="w-32 h-32 rounded-full mt-4 object-cover"
						/>
					)}
				</div>
				<button
					onClick={handleSaveSettings}
					type="submit"
					className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
				>
					Save Settings
				</button>
			</div>
		</div>
	);
}

export default Settings;
