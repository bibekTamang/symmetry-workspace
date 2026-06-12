const ProgressCard = () => {
  return (
    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/80 p-4 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
          Current Routine
        </p>
        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
          Active
        </span>
      </div>
      <p className="text-sm font-bold text-[#0F172A]">
        Hypertrophy Upper Block — Week 4
      </p>
      <div className="mt-2 flex items-center justify-between text-xs text-[#475569]">
        <span>Target: Chest / Back</span>
        <span className="font-semibold text-[#0F172A]">
          Progress: 65% Completed
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200/50">
        <div
          className="h-1.5 rounded-full bg-[#2563EB]"
          style={{ width: "65%" }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressCard;
