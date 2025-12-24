import { useEffect } from "react";
import { useGetEnabledCategories } from "../../hooks/explore/useGetEnabledCategories";
import Loading from "../shared/ui/Loading";

const activeStyle =
    "bg-white-base text-center w-full xl:py-[17px] py-[15px] text-black text-[14px] font-bold rounded-xl transition-all duration-300";
const inActiveStyle =
    "bg-[#27292C] text-center  w-full xl:py-[17px] py-[15px] text-white-base text-sm font-light rounded-xl transition-all duration-300 border-2 border-white-base";

const FilterButtons = ({ setFilter, filter }) => {
    const { data: categories, isLoading } = useGetEnabledCategories();

    useEffect(() => {
        if (categories && categories.length > 0 && !filter) {
            // Set the first enabled category as default if no filter is set
            setFilter(categories[0].name);
        }
    }, [categories, filter, setFilter]);

    const handleFilterChange = (filterCategory) => {
        setFilter(filterCategory);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-12">
                <Loading />
            </div>
        );
    }

    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-5 gap-10 justify-items-center my-12">
            {categories.map((category) => (
                <button
                    key={category.id}
                    className={
                        category.name === filter
                            ? activeStyle
                            : inActiveStyle
                    }
                    onClick={() => handleFilterChange(category.name)}
                >
                    {category.displayName}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
