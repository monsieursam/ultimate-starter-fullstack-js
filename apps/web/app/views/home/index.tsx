import { Link, useLoaderData } from "react-router";
import type { loader } from "~/routes/home";

export const HomeView = () => {
	const result = useLoaderData<typeof loader>();

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header with navigation */}
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
					<div className="flex-shrink-0">
						<h1 className="text-2xl font-bold text-gray-900">
							Ultimate Starter
						</h1>
					</div>
					<nav className="flex space-x-4">
						<Link
							to="/signin"
							className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
						>
							Sign In
						</Link>
						<Link
							to="/signup"
							className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
						>
							Sign Up
						</Link>
					</nav>
				</div>
			</header>

			{/* Main content */}
			<main className="flex-grow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
							Welcome to Ultimate Starter Fullstack JS
						</h2>
						<p className="mt-4 text-lg text-gray-500">
							A modern, full-stack JavaScript application starter built with
							Turborepo, React Router, oRPC, and Drizzle ORM.
						</p>
						<div className="mt-8">
							<Link
								to="/signup"
								className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
							>
								Get Started
							</Link>
						</div>
					</div>
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
							List of planet using oRPC and Drizzle
						</h2>
						<div>
							{result?.map((planet) => (
								<div key={planet.id} className="mb-2">
									{planet.name}
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
