import React from "react";

const activeStyle =
    "bg-white-base text-center w-full xl:py-[17px] py-[15px] text-black text-[14px] font-bold rounded-xl transition-all duration-300";
const inActiveStyle =
    "bg-[#27292C] text-center  w-full xl:py-[17px] py-[15px] text-white-base text-sm font-light rounded-xl transition-all duration-300 border-2 border-white-base";

const filterBtns = [
    {
        id: "modeling",
        name: "Modeling",
        category: "MODEL",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "videographing",
        name: "Videographing",
        category: "VIDEOGRAPHER",
        activeStyle,
        inActiveStyle,
    },
    {
        id: "photographing",
        name: "Photographing",
        category: "PHOTOGRAPHER",

        activeStyle,
        inActiveStyle,
    },
    {
        id: "photo & Video Editing",
        name: "Photo & Video Editing",
        category: "EDITOR",

        activeStyle,
        inActiveStyle,
    },
    {
        id: "tourism & Historical Advising",
        name: "Tourism & Historical Advising",
        category: "TOURISM",

        activeStyle,
        inActiveStyle,
    },
    {
        id: "music & Sound Engineers",
        name: "Music & Sound Engineering",
        category: "MUSIC_AND_SOUND_ENGINEER",

        activeStyle,
        inActiveStyle,
    },
    {
        id: "athleteic & fitness coaching",
        name: "Athleteic & Fitness Coaching",
        category: "ATHLETE",

        activeStyle,
        inActiveStyle,
    },
    {
        id: "beauty & cosmetics",
        name: "Beauty & Cosmetics",
        category: "BEAUTY",

        activeStyle,
        inActiveStyle,
    },
    {
        id: "visual arting & design",
        name: "Visual Arting & Design",
        category: "ARTIST",

        activeStyle,
        inActiveStyle,
    },
    {
        id: "fashion design",
        name: "Fashion Design",
        category: "FASHION",

        activeStyle,
        inActiveStyle,
    },
];

const FilterButtons = ({ setFilter, filter }) => {
    const handleFilterChange = (filterCategory) => {
        setFilter(filterCategory);
    };

    return (
        <div className="grid grid-cols-5 gap-10 justify-items-center my-12">
            {filterBtns.map((btn) => (
                <button
                    key={btn.id}
                    className={
                        btn.category === filter
                            ? btn.activeStyle
                            : btn.inActiveStyle
                    }
                    onClick={() => handleFilterChange(btn.category)}
                >
                    {btn.name}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
