
import { GiMeal } from "react-icons/gi";

const MealGiverLogo = () => {
  return (
    <div className="flex items-center md:gap-1 select-none">
      <GiMeal className="text-4xl text-primary" />
      <span className="text-2xl sm:text-3xl font-bold tracking-tight text-accent">
        <span className="text-primary">Meal</span>Giver
      </span>
    </div>
  );
};

export default MealGiverLogo;
