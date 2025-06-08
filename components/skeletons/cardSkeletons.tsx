const CardSkeletons = () => {
  return (
    <div className="bg-slate-100 shadow-lg rounded-sm animate-pulse">
      <div className="h-[260px] w-auto rounded-t-sm bg-slate-300"></div>

      <div className="p-8">
        <div className="mb-2">
          <div className="h-5 w-72 rounded bg-slate-400"></div>
        </div>

        <div className="mb-7">
          <div className="h-6 w-32 rounded bg-slate-400"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-slate-200">
              <span>
                <div className="h-5 w-12 rounded bg-slate-400"></div>
              </span>
            </div>
            <div className="h-12 w-36 rounded-sm bg-slate-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeletons;
