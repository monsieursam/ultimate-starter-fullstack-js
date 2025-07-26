// NotFound.tsx
export function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="mb-4">
				Sorry, the page you are looking for does not exist.
			</p>
			{/* Add a Link to home if desired */}
		</div>
	);
}
