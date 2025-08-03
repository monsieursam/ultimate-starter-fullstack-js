import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
	Alert,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;

export default function DashboardScreen() {
	const [prompt, setPrompt] = useState("");
	const [generatedImages, setGeneratedImages] = useState([
		// Placeholder images for demonstration
		{ id: 1, url: "https://picsum.photos/400/400" },
		{ id: 2, url: "https://picsum.photos/400/400" },
	]);

	const handleGenerateImage = () => {
		// Implement AI image generation logic here
		console.log("Generating image with prompt:", prompt);
	};

	// Function to save image locally
	const handleSaveImage = async (imageUrl: string) => {
		try {
			const filename = `${FileSystem.documentDirectory}image-${Date.now()}.jpg`;
			await FileSystem.downloadAsync(imageUrl, filename);
			Alert.alert("Success", "Image saved successfully!");
		} catch (error) {
			Alert.alert("Error", "Failed to save image");
			console.error(error);
		}
	};

	// Function to share image
	const handleShareImage = async (imageUrl: string) => {
		try {
			const isAvailable = await Sharing.isAvailableAsync();
			if (!isAvailable) {
				Alert.alert("Error", "Sharing is not available on this device");
				return;
			}
			await Sharing.shareAsync(imageUrl);
		} catch (error) {
			Alert.alert("Error", "Failed to share image");
			console.error(error);
		}
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.title}>AI Image Studio</Text>
				<Link href="/profile" asChild>
					<TouchableOpacity style={styles.profileButton}>
						<Ionicons name="person-circle-outline" size={32} color="#333" />
					</TouchableOpacity>
				</Link>
			</View>

			<View style={styles.promptContainer}>
				<TextInput
					style={styles.input}
					placeholder="Describe the image you want to generate..."
					placeholderTextColor="#666"
					value={prompt}
					onChangeText={setPrompt}
					multiline
					numberOfLines={3}
				/>
				<TouchableOpacity
					style={[styles.button, !prompt ? styles.buttonDisabled : null]}
					onPress={handleGenerateImage}
					disabled={!prompt}
				>
					<Text style={styles.buttonText}>Generate Image</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.galleryContainer}>
				<Text style={styles.sectionTitle}>Your Creations</Text>
				<View style={styles.gallery}>
					{generatedImages.map((image) => (
						<View key={image.id} style={styles.imageCard}>
							<Image source={{ uri: image.url }} style={styles.image} />
							<View style={styles.imageOverlay}>
								<View style={styles.actionButtons}>
									{/* <Link
										href={{
											pathname: "/edit",
											params: { imageId: image.id },
										}}
										asChild
									>
										<TouchableOpacity style={styles.actionButton}>
											<Ionicons name="create-outline" size={24} color="#fff" />
											<Text style={styles.actionButtonText}>Edit</Text>
										</TouchableOpacity>
									</Link> */}
									<TouchableOpacity
										style={styles.actionButton}
										onPress={() => handleSaveImage(image.url)}
									>
										<Ionicons name="download-outline" size={24} color="#fff" />
										<Text style={styles.actionButtonText}>Save</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.actionButton}
										onPress={() => handleShareImage(image.url)}
									>
										<Ionicons name="share-outline" size={24} color="#fff" />
										<Text style={styles.actionButtonText}>Share</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					))}
				</View>
			</View>

			<View style={styles.featuresContainer}>
				<Text style={styles.sectionTitle}>Quick Actions</Text>
				<View style={styles.features}>
					<TouchableOpacity style={styles.featureCard}>
						<Ionicons name="color-palette-outline" size={32} color="#4A90E2" />
						<Text style={styles.featureTitle}>Style Transfer</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.featureCard}>
						<Ionicons name="resize-outline" size={32} color="#4A90E2" />
						<Text style={styles.featureTitle}>Upscale</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.featureCard}>
						<Ionicons name="images-outline" size={32} color="#4A90E2" />
						<Text style={styles.featureTitle}>Variations</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		backgroundColor: "#f5f5f5",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
	profileButton: {
		padding: 5,
	},
	promptContainer: {
		padding: 20,
		backgroundColor: "#fff",
		margin: 10,
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	input: {
		backgroundColor: "#f8f8f8",
		borderRadius: 10,
		padding: 15,
		fontSize: 16,
		color: "#333",
		textAlignVertical: "top",
	},
	button: {
		backgroundColor: "#4A90E2",
		borderRadius: 10,
		padding: 15,
		alignItems: "center",
		marginTop: 10,
	},
	buttonDisabled: {
		backgroundColor: "#B8B8B8",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	galleryContainer: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#333",
		marginBottom: 15,
	},
	gallery: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	imageCard: {
		width: CARD_WIDTH,
		height: CARD_WIDTH,
		marginBottom: 20,
		borderRadius: 15,
		overflow: "hidden",
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		padding: 15,
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
	},
	actionButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
		marginLeft: 5,
	},
	featuresContainer: {
		padding: 20,
	},
	features: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	featureCard: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 12,
		alignItems: "center",
		width: width * 0.28,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	featureTitle: {
		marginTop: 8,
		fontSize: 14,
		color: "#333",
		textAlign: "center",
	},
});
