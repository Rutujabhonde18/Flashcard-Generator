const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white px-8 py-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-semibold">Creating Flashcard...</p>
      </div>
    </div>
  );
};

export default Loading;
