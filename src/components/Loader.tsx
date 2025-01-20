'use client';

interface LoaderProps {
    fullScreen?: boolean;
}

const Loader = ({ fullScreen = true }: LoaderProps) => {
    const loaderClasses = "w-12 h-12 rounded-full animate-spin border-x border-solid border-green-600 border-t-transparent";

    const containerClasses = fullScreen
        ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
        : 'flex items-center justify-center';

    return (
        <div className={containerClasses}>
            <div className={loaderClasses} role="status" aria-label="Loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;

